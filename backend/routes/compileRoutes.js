import express from "express";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

import authMiddleware from "../middleware/authMiddleware.js";
import prisma from "../prismaClient.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicit PATH ensures javac / g++ / python3 are found on cloud hosts
// (exec() does NOT inherit the full login-shell PATH in many environments)
const JAVA_HOME = process.env.JAVA_HOME || "/usr/lib/jvm/java-17-openjdk-amd64";
const EXEC_ENV = {
    PATH: [
        `${JAVA_HOME}/bin`,
        "/usr/local/sbin",
        "/usr/local/bin",
        "/usr/sbin",
        "/usr/bin",
        "/sbin",
        "/bin",
        process.env.PATH || "",
    ]
        .filter(Boolean)
        .join(":"),
};

const EXEC_OPTIONS = {
    timeout: 5000,
    maxBuffer: 1024 * 1024, // 1 MB
    env: { ...process.env, ...EXEC_ENV },
};

// =====================================================
// SAVE RUN HISTORY
// =====================================================

const saveHistory = async ({
    userId,
    language,
    code,
    input,
    output,
    status,
}) => {
    try {
        await prisma.runHistory.create({
            data: {
                userId,
                language,
                code,
                input: input || "",
                output: output || "",
                status,
            },
        });

        console.log("Run history saved");
    } catch (error) {
        console.error("HISTORY SAVE ERROR:", error);
    }
};

// =====================================================
// COMPILE / RUN
// =====================================================

router.post("/", authMiddleware, async (req, res) => {
    const { language, code, input = "" } = req.body;

    const userId = req.userId;

    if (!language) {
        return res.status(400).json({
            output: "Language is required",
            type: "error",
        });
    }

    if (!code) {
        return res.status(400).json({
            output: "Code is required",
            type: "error",
        });
    }

    const tempDir = path.join(process.cwd(), "temp");

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true, mode: 0o777 });
    }

    const selectedLanguage = language.toLowerCase();

    // Create a unique folder for each execution to prevent collisions/permission locks
    const execId = `run_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const runDir = path.join(tempDir, execId);
    fs.mkdirSync(runDir, { recursive: true });

    const runOptions = {
        timeout: 8000,
        maxBuffer: 2 * 1024 * 1024,
        cwd: runDir,
        env: { ...process.env, ...EXEC_ENV },
    };

    const cleanup = () => {
        try {
            fs.rmSync(runDir, { recursive: true, force: true });
        } catch (e) {
            // ignore cleanup errors
        }
    };

    // Helper to send response and cleanup
    const finish = ({ output, type, status }) => {
        cleanup();
        saveHistory({
            userId,
            language,
            code,
            input,
            output,
            status,
        });
        return res.json({ output, type });
    };

    // =====================================================
    // JAVA
    // =====================================================
    if (selectedLanguage === "java") {
        const javaFile = path.join(runDir, "Main.java");
        fs.writeFileSync(javaFile, code, "utf-8");

        exec("javac Main.java", runOptions, (compileErr, compStdout, compStderr) => {
            if (compileErr) {
                const compileOutput = (compStderr || compStdout || compileErr.message || "Compilation failed").trim();
                return finish({
                    output: compileOutput,
                    type: "error",
                    status: "error",
                });
            }

            const child = exec("java -Xmx256m Main", runOptions, (runErr, runStdout, runStderr) => {
                if (runErr) {
                    let runOutput;
                    if (runErr.killed) {
                        runOutput = "Execution timed out (Limit: 8s). Possible infinite loop.";
                    } else if (runErr.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER") {
                        runOutput = "Output limit exceeded.";
                    } else {
                        runOutput = (runStderr || runStdout || runErr.message || "Runtime error.").trim();
                    }
                    return finish({
                        output: runOutput,
                        type: "error",
                        status: "error",
                    });
                }

                return finish({
                    output: runStdout || "Program executed successfully with no output.",
                    type: "success",
                    status: "success",
                });
            });

            if (input) {
                child.stdin.write(input);
            }
            child.stdin.end();
        });

        return;
    }

    // =====================================================
    // C++
    // =====================================================
    if (selectedLanguage === "cpp") {
        const isWin = process.platform === "win32";
        const cppFile = path.join(runDir, "Main.cpp");
        const exeFile = isWin ? "Main.exe" : "./Main.out";

        fs.writeFileSync(cppFile, code, "utf-8");

        exec(`g++ Main.cpp -O2 -o ${isWin ? "Main.exe" : "Main.out"}`, runOptions, (compileErr, compStdout, compStderr) => {
            if (compileErr) {
                const compileOutput = (compStderr || compStdout || compileErr.message || "Compilation failed").trim();
                return finish({
                    output: compileOutput,
                    type: "error",
                    status: "error",
                });
            }

            const child = exec(exeFile, runOptions, (runErr, runStdout, runStderr) => {
                if (runErr) {
                    let runOutput;
                    if (runErr.killed) {
                        runOutput = "Execution timed out (Limit: 8s).";
                    } else if (runErr.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER") {
                        runOutput = "Output limit exceeded.";
                    } else {
                        runOutput = (runStderr || runStdout || runErr.message || "Runtime error.").trim();
                    }
                    return finish({
                        output: runOutput,
                        type: "error",
                        status: "error",
                    });
                }

                return finish({
                    output: runStdout || "Program executed successfully with no output.",
                    type: "success",
                    status: "success",
                });
            });

            if (input) {
                child.stdin.write(input);
            }
            child.stdin.end();
        });

        return;
    }

    // =====================================================
    // PYTHON
    // =====================================================
    if (selectedLanguage === "python") {
        const pythonFile = path.join(runDir, "Main.py");
        fs.writeFileSync(pythonFile, code, "utf-8");

        const pythonCmd = process.platform === "win32" ? "python" : "python3";
        const child = exec(`${pythonCmd} Main.py`, runOptions, (runErr, runStdout, runStderr) => {
            if (runErr) {
                let runOutput;
                if (runErr.killed) {
                    runOutput = "Execution timed out (Limit: 8s).";
                } else if (runErr.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER") {
                    runOutput = "Output limit exceeded.";
                } else {
                    runOutput = (runStderr || runStdout || runErr.message || "Runtime error.").trim();
                }
                return finish({
                    output: runOutput,
                    type: "error",
                    status: "error",
                });
            }

            return finish({
                output: runStdout || "Program executed successfully with no output.",
                type: "success",
                status: "success",
            });
        });

        if (input) {
            child.stdin.write(input);
        }
        child.stdin.end();

        return;
    }

    // =====================================================
    // JAVASCRIPT
    // =====================================================
    if (selectedLanguage === "javascript") {
        const jsFile = path.join(runDir, "Main.js");
        fs.writeFileSync(jsFile, code, "utf-8");

        const child = exec(`node Main.js`, runOptions, (runErr, runStdout, runStderr) => {
            if (runErr) {
                let runOutput;
                if (runErr.killed) {
                    runOutput = "Execution timed out (Limit: 8s).";
                } else if (runErr.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER") {
                    runOutput = "Output limit exceeded.";
                } else {
                    runOutput = (runStderr || runStdout || runErr.message || "Runtime error.").trim();
                }
                return finish({
                    output: runOutput,
                    type: "error",
                    status: "error",
                });
            }

            return finish({
                output: runStdout || "Program executed successfully with no output.",
                type: "success",
                status: "success",
            });
        });

        if (input) {
            child.stdin.write(input);
        }
        child.stdin.end();

        return;
    }

    // =====================================================
    // UNSUPPORTED LANGUAGE
    // =====================================================

    return res.status(400).json({
        output: `${language} compiler is not supported yet.`,
        type: "error",
    });
});

export default router;