import prismaClient from "@repo/db";
import { Router } from "express";

const getImagesRouter = Router();

getImagesRouter.get("/images/bulk", async (req, res) => {
    const imagesId = req.query.images as string[];
    const limit = req.query.limit as string ?? "10";
    const offset = req.query.offset as string ?? "0";

    if (!imagesId) {
        res.status(400).json({ msg: "Invalid images array" });
        return;
    }

    try {
        const imagesData = await prismaClient.outputImage.findMany({
            where: {
                id: { in: imagesId },
                userId: "6cace30d-6d95-4ecc-b602-dfaac6f33805"
            },
            take: limit ? parseInt(limit) : undefined,
            skip: offset ? parseInt(offset) : undefined,
        });

        res.json({ images: imagesData });
    } catch (error) {
        console.error("Error retrieving images:", error);
        res.status(500).json({ msg: "Error retrieving images" });
        return;        
    }
});

export default getImagesRouter;