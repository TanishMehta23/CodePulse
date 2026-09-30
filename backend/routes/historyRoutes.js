import express from "express";
import prisma from "../prismaClient.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// =========================
// GET USER HISTORY
// =========================

router.get("/", authMiddleware, async (req, res) => {
    try {
        const history = await prisma.runHistory.findMany({
            where: {
                userId: req.userId
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 10
        });

        return res.json({
            history
        });

    } catch (error) {
        console.error("GET HISTORY ERROR:", error);

        return res.status(500).json({
            message: "Failed to fetch history"
        });
    }
});


// =========================
// DELETE HISTORY ITEM
// =========================

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const history = await prisma.runHistory.findFirst({
            where: {
                id,
                userId: req.userId
            }
        });

        if (!history) {
            return res.status(404).json({
                message: "History item not found"
            });
        }

        await prisma.runHistory.delete({
            where: {
                id
            }
        });

        return res.json({
            message: "History deleted successfully"
        });

    } catch (error) {
        console.error("DELETE HISTORY ERROR:", error);

        return res.status(500).json({
            message: "Failed to delete history"
        });
    }
});


// =========================
// DELETE ALL HISTORY
// =========================

router.delete("/", authMiddleware, async (req, res) => {
    try {
        await prisma.runHistory.deleteMany({
            where: {
                userId: req.userId
            }
        });

        return res.json({
            message: "History cleared successfully"
        });

    } catch (error) {
        console.error("CLEAR HISTORY ERROR:", error);

        return res.status(500).json({
            message: "Failed to clear history"
        });
    }
});


export default router;