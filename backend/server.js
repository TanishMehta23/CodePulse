import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compileRoutes from "./routes/compileRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());

app.use("/api/compile", compileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/favorites", favoriteRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "CodePulse Backend Running"
    });
});

import { execSync } from "child_process";

app.get("/health", (req, res) => {
    const checkCmd = (cmd) => {
        try {
            return execSync(cmd, { encoding: "utf-8" }).trim();
        } catch (err) {
            return "NOT INSTALLED / " + (err.stderr || err.message);
        }
    };

    res.json({
        status: "OK",
        environment: process.platform,
        node: process.version,
        javac: checkCmd("javac -version"),
        gpp: checkCmd("g++ --version"),
        python3: checkCmd("python3 --version")
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;