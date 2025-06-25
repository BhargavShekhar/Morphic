import { Router } from "express";
import { GenerateImageFromPackSchema } from "@repo/common/types";
import prismaClient from "@repo/db";

const generatePackRouter = Router();

generatePackRouter.get("/pack/generatePack",async (req, res) => {
    const parsedBody = GenerateImageFromPackSchema.safeParse(req.body);

    if (!parsedBody.success) {
        res.status(400).json({
            error: "Invalid request body",
            issues: parsedBody.error.issues,
        });
        return;
    }

    const { modelId, packId } = parsedBody.data;

    try {
        const prompts = await prismaClient.packPrompts.findMany({
            where: { packId },
        });

        const images = await prismaClient.outputImage.createManyAndReturn({
            data: prompts.map(prompt => ({
                prompt: prompt.prompt,
                userId: "6cace30d-6d95-4ecc-b602-dfaac6f33805",
                modelId,
            }))
        })

        res.json({ msg: "Created images sussesfully", images: images.map(image => image.id) })
    } catch (error) {
        console.log("Could not genreate output images of the pack", error);
        res.status(500).json({ msg: "Could not genreate output images of the pack" });
    }

    res.json({ msg: "Welcome to generatePack router" });
});

export default generatePackRouter;