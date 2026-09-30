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

const EXEC_OPTIONS = {
    timeout: 5000,
    maxBuffer: 1024 * 1024, // 1 MB
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

    const tempDir = path.join(__dirname, "../temp");

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const selectedLanguage = language.toLowerCase();

    // =====================================================
    // JAVA
    // =====================================================

    if (selectedLanguage === "java") {
        const javaFile = path.join(tempDir, "Main.java");

        fs.writeFileSync(javaFile, code);

        exec(
            `javac "${javaFile}"`,
            EXEC_OPTIONS,
            (compileError, stdout, stderr) => {
                if (compileError) {
                    const output =
                        stderr || compileError.message || "Compilation failed.";

                    console.log("JAVA COMPILATION ERROR:");
                    console.log(output);

                    saveHistory({
                        userId,
                        language,
                        code,
                        input,
                        output,
                        status: "error",
                    });

                    return res.json({
                        output,
                        type: "error",
                    });
                }

                console.log("Java compilation successful");

                const command = `java -cp "${tempDir}" Main`;

                const child = exec(
                    command,
                    EXEC_OPTIONS,
                    (runError, stdout, stderr) => {
                        if (runError) {
                            let output;

                            if (runError.killed) {
                                output =
                                    "Execution timed out. Your program may contain an infinite loop.";
                            } else if (
                                runError.code ===
                                "ERR_CHILD_PROCESS_STDIO_MAXBUFFER"
                            ) {
                                output =
                                    "Output limit exceeded. Your program produced too much output.";
                            } else {
                                output =
                                    stderr ||
                                    runError.message ||
                                    "Runtime error.";
                            }

                            console.log("JAVA RUNTIME ERROR:");
                            console.log(output);

                            saveHistory({
                                userId,
                                language,
                                code,
                                input,
                                output,
                                status: "error",
                            });

                            return res.json({
                                output,
                                type: "error",
                            });
                        }

                        const output = stdout;

                        saveHistory({
                            userId,
                            language,
                            code,
                            input,
                            output,
                            status: "success",
                        });

                        return res.json({
                            output,
                            type: "success",
                        });
                    }
                );

                if (input) {
                    child.stdin.write(input);
                }

                child.stdin.end();
            }
        );

        return;
    }

    // =====================================================
    // C++
    // =====================================================

    if (selectedLanguage === "cpp") {
        const cppFile = path.join(tempDir, "Main.cpp");
        const exeFile = path.join(tempDir, "Main.exe");

        fs.writeFileSync(cppFile, code);

        exec(
            `g++ "${cppFile}" -o "${exeFile}"`,
            EXEC_OPTIONS,
            (compileError, stdout, stderr) => {
                if (compileError) {
                    const output =
                        stderr || compileError.message || "Compilation failed.";

                    console.log("C++ COMPILATION ERROR:");
                    console.log(output);

                    saveHistory({
                        userId,
                        language,
                        code,
                        input,
                        output,
                        status: "error",
                    });

                    return res.json({
                        output,
                        type: "error",
                    });
                }

                console.log("C++ compilation successful");

                const command = `"${exeFile}"`;

                const child = exec(
                    command,
                    EXEC_OPTIONS,
                    (runError, stdout, stderr) => {
                        if (runError) {
                            let output;

                            if (runError.killed) {
                                output =
                                    "Execution timed out. Your program may contain an infinite loop.";
                            } else if (
                                runError.code ===
                                "ERR_CHILD_PROCESS_STDIO_MAXBUFFER"
                            ) {
                                output =
                                    "Output limit exceeded. Your program produced too much output.";
                            } else {
                                output =
                                    stderr ||
                                    runError.message ||
                                    "Runtime error.";
                            }

                            console.log("C++ RUNTIME ERROR:");
                            console.log(output);

                            saveHistory({
                                userId,
                                language,
                                code,
                                input,
                                output,
                                status: "error",
                            });

                            return res.json({
                                output,
                                type: "error",
                            });
                        }

                        const output = stdout;

                        saveHistory({
                            userId,
                            language,
                            code,
                            input,
                            output,
                            status: "success",
                        });

                        return res.json({
                            output,
                            type: "success",
                        });
                    }
                );

                if (input) {
                    child.stdin.write(input);
                }

                child.stdin.end();
            }
        );

        return;
    }

    // =====================================================
    // PYTHON
    // =====================================================

    if (selectedLanguage === "python") {
        const pythonFile = path.join(tempDir, "Main.py");

        fs.writeFileSync(pythonFile, code);

        const command = `python "${pythonFile}"`;

        const child = exec(
            command,
            EXEC_OPTIONS,
            (runError, stdout, stderr) => {
                if (runError) {
                    let output;

                    if (runError.killed) {
                        output =
                            "Execution timed out. Your program may contain an infinite loop.";
                    } else if (
                        runError.code ===
                        "ERR_CHILD_PROCESS_STDIO_MAXBUFFER"
                    ) {
                        output =
                            "Output limit exceeded. Your program produced too much output.";
                    } else {
                        output =
                            stderr ||
                            runError.message ||
                            "Runtime error.";
                    }

                    console.log("PYTHON RUNTIME ERROR:");
                    console.log(output);

                    saveHistory({
                        userId,
                        language,
                        code,
                        input,
                        output,
                        status: "error",
                    });

                    return res.json({
                        output,
                        type: "error",
                    });
                }

                const output = stdout;

                saveHistory({
                    userId,
                    language,
                    code,
                    input,
                    output,
                    status: "success",
                });

                return res.json({
                    output,
                    type: "success",
                });
            }
        );

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
        const javascriptFile = path.join(tempDir, "Main.js");

        fs.writeFileSync(javascriptFile, code);

        const command = `node "${javascriptFile}"`;

        const child = exec(
            command,
            EXEC_OPTIONS,
            (runError, stdout, stderr) => {
                if (runError) {
                    let output;

                    if (runError.killed) {
                        output =
                            "Execution timed out. Your program may contain an infinite loop.";
                    } else if (
                        runError.code ===
                        "ERR_CHILD_PROCESS_STDIO_MAXBUFFER"
                    ) {
                        output =
                            "Output limit exceeded. Your program produced too much output.";
                    } else {
                        output =
                            stderr ||
                            runError.message ||
                            "Runtime error.";
                    }

                    console.log("JAVASCRIPT RUNTIME ERROR:");
                    console.log(output);

                    saveHistory({
                        userId,
                        language,
                        code,
                        input,
                        output,
                        status: "error",
                    });

                    return res.json({
                        output,
                        type: "error",
                    });
                }

                const output = stdout;

                saveHistory({
                    userId,
                    language,
                    code,
                    input,
                    output,
                    status: "success",
                });

                return res.json({
                    output,
                    type: "success",
                });
            }
        );

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