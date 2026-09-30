import express from "express";
import prisma from "../prismaClient.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// =========================
// GET FAVORITES
// =========================

router.get("/", authMiddleware, async (req, res) => {
    try {
        const favorites = await prisma.favorite.findMany({
            where: {
                userId: req.userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return res.json({
            favorites
        });

    } catch (error) {
        console.error("GET FAVORITES ERROR:", error);

        return res.status(500).json({
            message: "Failed to fetch favorites"
        });
    }
});


// =========================
// ADD FAVORITE
// =========================

router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            language,
            code,
            input = ""
        } = req.body;

        if (!language || !code) {
            return res.status(400).json({
                message: "Language and code are required"
            });
        }

        // Check duplicate
        const existingFavorite = await prisma.favorite.findFirst({
            where: {
                userId: req.userId,
                language,
                code,
                input
            }
        });

        if (existingFavorite) {
            return res.status(409).json({
                message: "This code is already in favorites"
            });
        }

        // Maximum 5 favorites
        const favoriteCount = await prisma.favorite.count({
            where: {
                userId: req.userId
            }
        });

        if (favoriteCount >= 5) {
            return res.status(400).json({
                message: "You can only save up to 5 favorites"
            });
        }

        const favorite = await prisma.favorite.create({
            data: {
                userId: req.userId,
                language,
                code,
                input
            }
        });

        return res.status(201).json({
            message: "Added to favorites",
            favorite
        });

    } catch (error) {
        console.error("ADD FAVORITE ERROR:", error);

        return res.status(500).json({
            message: "Failed to add favorite"
        });
    }
});

// =========================
// DELETE FAVORITE
// =========================

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const favorite = await prisma.favorite.findFirst({
            where: {
                id,
                userId: req.userId
            }
        });

        if (!favorite) {
            return res.status(404).json({
                message: "Favorite not found"
            });
        }

        await prisma.favorite.delete({
            where: {
                id
            }
        });

        return res.json({
            message: "Favorite removed"
        });

    } catch (error) {
        console.error("DELETE FAVORITE ERROR:", error);

        return res.status(500).json({
            message: "Failed to remove favorite"
        });
    }
});


export default router;