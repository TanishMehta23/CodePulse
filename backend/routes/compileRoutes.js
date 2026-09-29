import express from "express";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXEC_OPTIONS = {
    timeout: 5000,
    maxBuffer: 1024 * 1024, // 1 MB
};

router.post("/", (req, res) => {
    const { language, code, input = "" } = req.body;

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

    // =========================
    // JAVA
    // =========================

    if (language.toLowerCase() === "java") {
        const javaFile = path.join(tempDir, "Main.java");

        fs.writeFileSync(javaFile, code);

        exec(
            `javac "${javaFile}"`,
            EXEC_OPTIONS,
            (compileError, stdout, stderr) => {
                if (compileError) {
                    console.log("JAVA COMPILATION ERROR:");
                    console.log(stderr);

                    return res.json({
                        output: stderr || compileError.message,
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
                            console.log("JAVA RUNTIME ERROR:");
                            console.log(stderr);

                            if (runError.killed) {
                                return res.json({
                                    output:
                                        "Execution timed out. Your program may contain an infinite loop.",
                                    type: "error",
                                });
                            }

                            if (runError.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER") {
                                return res.json({
                                    output:
                                        "Output limit exceeded. Your program produced too much output.",
                                    type: "error",
                                });
                            }

                            return res.json({
                                output: stderr || runError.message,
                                type: "error",
                            });
                        }

                        return res.json({
                            output: stdout,
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

    // =========================
    // C++
    // =========================

    if (language.toLowerCase() === "cpp") {
        const cppFile = path.join(tempDir, "Main.cpp");
        const exeFile = path.join(tempDir, "Main.exe");

        fs.writeFileSync(cppFile, code);

        exec(
            `g++ "${cppFile}" -o "${exeFile}"`,
            EXEC_OPTIONS,
            (compileError, stdout, stderr) => {
                if (compileError) {
                    console.log("C++ COMPILATION ERROR:");
                    console.log(stderr);

                    return res.json({
                        output: stderr || compileError.message,
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
                            console.log("C++ RUNTIME ERROR:");
                            console.log(stderr);

                            if (runError.killed) {
                                return res.json({
                                    output:
                                        "Execution timed out. Your program may contain an infinite loop.",
                                    type: "error",
                                });
                            }

                            if (runError.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER") {
                                return res.json({
                                    output:
                                        "Output limit exceeded. Your program produced too much output.",
                                    type: "error",
                                });
                            }

                            return res.json({
                                output: stderr || runError.message,
                                type: "error",
                            });
                        }

                        return res.json({
                            output: stdout,
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

    // =========================
    // PYTHON
    // =========================

    if (language.toLowerCase() === "python") {
        const pythonFile = path.join(tempDir, "Main.py");

        fs.writeFileSync(pythonFile, code);

        const command = `python "${pythonFile}"`;

        const child = exec(
            command,
            EXEC_OPTIONS,
            (runError, stdout, stderr) => {
                if (runError) {
                    console.log("PYTHON RUNTIME ERROR:");
                    console.log(stderr);

                    if (runError.killed) {
                        return res.json({
                            output:
                                "Execution timed out. Your program may contain an infinite loop.",
                            type: "error",
                        });
                    }

                    if (runError.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER") {
                        return res.json({
                            output:
                                "Output limit exceeded. Your program produced too much output.",
                            type: "error",
                        });
                    }

                    return res.json({
                        output: stderr || runError.message,
                        type: "error",
                    });
                }

                return res.json({
                    output: stdout,
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

    // =========================
    // JAVASCRIPT
    // =========================

    if (language.toLowerCase() === "javascript") {
        const javascriptFile = path.join(tempDir, "Main.js");

        fs.writeFileSync(javascriptFile, code);

        const command = `node "${javascriptFile}"`;

        const child = exec(
            command,
            EXEC_OPTIONS,
            (runError, stdout, stderr) => {
                if (runError) {
                    console.log("JAVASCRIPT RUNTIME ERROR:");
                    console.log(stderr);

                    if (runError.killed) {
                        return res.json({
                            output:
                                "Execution timed out. Your program may contain an infinite loop.",
                            type: "error",
                        });
                    }

                    if (runError.code === "ERR_CHILD_PROCESS_STDIO_MAXBUFFER") {
                        return res.json({
                            output:
                                "Output limit exceeded. Your program produced too much output.",
                            type: "error",
                        });
                    }

                    return res.json({
                        output: stderr || runError.message,
                        type: "error",
                    });
                }

                return res.json({
                    output: stdout,
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

    // =========================
    // UNSUPPORTED LANGUAGE
    // =========================

    return res.status(400).json({
        output: `${language} compiler is not supported yet.`,
        type: "error",
    });
});

export default router;