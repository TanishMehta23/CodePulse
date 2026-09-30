import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compileRoutes from "./routes/compileRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
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

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});