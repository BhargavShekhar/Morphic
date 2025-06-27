import { Router } from "express";
import { GenerateImageFromPackSchema } from "@repo/common/types";
import prismaClient from "@repo/db";

const getPackRouter = Router();

getPackRouter.get("/pack/bulk", async (req, res) => {
    try {
        const packs = await prismaClient.packs.findMany();
        res.json({ msg: "pack retrieved successfully", packs });
    } catch (error) {
        console.error("Error retrieving packs:", error);
        res.status(500).json({ msg: "Error retrieving packs" });
    }
});

export default getPackRouter;