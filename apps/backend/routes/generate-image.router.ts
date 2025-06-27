import { Router } from "express";
import { GenerateImageSchema } from "@repo/common/types";
import prismaClient from "@repo/db";
import { FalAIModel } from "../models/FalAIModel";

const generateImageRouter = Router();
const falAiModel = new FalAIModel();

generateImageRouter.post("/ai/generate", async (req, res) => {
    const parsedData = GenerateImageSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({ error: "Invalid request data" });
        return;
    }

    const { modelId, prompt } = parsedData.data;

    try {
        const model = await prismaClient.model.findUnique({
            where: { id: modelId }
        })

        if (!model || !model.tensorPath) {
            res.status(404).json({ error: "Model not found" });
            return;
        }

        const { request_id } = await falAiModel.generateImage(prompt, model.tensorPath);

        const generatedImage = await prismaClient.outputImage.create({
            data: {
                prompt,
                userId: "6cace30d-6d95-4ecc-b602-dfaac6f33805",
                modelId,
                falAiReqId: request_id,
            }
        })

        res.json({ msg: "generated image sucessfully", generatedImageId: generatedImage.id });
    } catch (error) {
        console.log("Error generating image:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default generateImageRouter;