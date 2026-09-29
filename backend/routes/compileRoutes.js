import express from "express";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post("/", (req, res) => {
    const { language, code, input = "" } = req.body;

    if (!code) {
        return res.status(400).json({
            output: "Code is required",
            type: "error"
        });
    }

    if (language.toLowerCase() !== "java") {
        return res.status(400).json({
            output: "Currently only Java is supported",
            type: "error"
        });
    }

    const tempDir = path.join(__dirname, "../temp");

    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const javaFile = path.join(tempDir, "Main.java");

    fs.writeFileSync(javaFile, code);

    // Compile Java
    exec(`javac "${javaFile}"`, (compileError, stdout, stderr) => {

        if (compileError) {
            console.log("JAVA COMPILATION ERROR:");
            console.log(stderr);

            return res.json({
                output: stderr || compileError.message,
                type: "error"
            });
        }

        console.log("Java compilation successful");

        // Run Java
        const command = `java -cp "${tempDir}" Main`;

        const child = exec(command, (runError, stdout, stderr) => {

            if (runError) {
                console.log("JAVA RUNTIME ERROR:");
                console.log(stderr);

                return res.json({
                    output: stderr || runError.message,
                    type: "error"
                });
            }

            return res.json({
                output: stdout,
                type: "success"
            });
        });

        // Send input to program
        if (input) {
            child.stdin.write(input);
        }

        child.stdin.end();
    });
});

export default router;