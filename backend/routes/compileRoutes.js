import express from "express";
import fs from "fs";
import path from "path";
import { exec, execSync } from "child_process";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

import prisma from "../prismaClient.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamically resolve the Java bin dir at startup — works on amd64 AND arm64
const resolveJavaBin = () => {
    // 1. JAVA_HOME explicitly set by platform/Dockerfile env
    if (process.env.JAVA_HOME) return `${process.env.JAVA_HOME}/bin`;

    // 2. Find javac via `which` (fastest, most reliable)
    try {
        const javacPath = execSync("which javac", { encoding: "utf-8" }).trim();
        if (javacPath) return path.dirname(fs.realpathSync(javacPath));
    } catch (_) {}

    // 3. Fallback: check common JDK bin dirs (amd64 + arm64 + generic)
    const candidates = [
        "/usr/lib/jvm/java-17-openjdk-amd64/bin",
        "/usr/lib/jvm/java-17-openjdk-arm64/bin",
        "/usr/lib/jvm/java-17/bin",
        "/usr/lib/jvm/default-java/bin",
    ];
    for (const c of candidates) {
        try { if (fs.existsSync(c)) return c; } catch (_) {}
    }
    return "";
};

const JAVA_BIN = resolveJavaBin();
console.log("[startup] JAVA_BIN resolved to:", JAVA_BIN || "(not found)");

const EXEC_ENV = {
    PATH: [
        JAVA_BIN,
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
// OPTIONAL AUTH — guests can compile, logged-in users get history
// =====================================================

const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userId;
        } else {
            req.userId = null; // guest — no token sent
        }
    } catch (_) {
        req.userId = null; // expired / invalid token → treat as guest
    }
    next();
};

// =====================================================
// COMPILE / RUN
// =====================================================

router.post("/", optionalAuth, async (req, res) => {
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
        // Only save history for logged-in users
        if (userId) {
            saveHistory({ userId, language, code, input, output, status });
        }
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