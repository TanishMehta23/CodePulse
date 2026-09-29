import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compileRoutes from "./routes/compileRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/compile", compileRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "CodePulse Backend Running"
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});