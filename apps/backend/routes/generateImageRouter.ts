import { Router } from "express";
import { GenerateImageSchema } from "@repo/common/types";
import prismaClient from "@repo/db";

const generateImageRouter = Router();

generateImageRouter.post("/ai/generate", async (req, res) => {
    const parsedData = GenerateImageSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid request data" });
        return;
    }

    const { modelId, prompt } = parsedData.data;

    try {
        const generatedImage = await prismaClient.outputImage.create({
            data: {
                prompt,
                userId: "6cace30d-6d95-4ecc-b602-dfaac6f33805",
                modelId
            }
        })

        res.json({ msg: "generated image sucessfully", generatedImageId: generatedImage.id });
    } catch (error) {
        console.log("")
    }

    res.json({ msg: "Welcome to training router" })
})

export default generateImageRouter;