import { Router } from "express";
import { GenerateImageFromPackSchema } from "@repo/common/types";
import prismaClient from "@repo/db";
import { FalAIModel } from "../models/FalAIModel";

const generatePackRouter = Router();

const falAiModel = new FalAIModel();

generatePackRouter.get("/", async (req, res) => {
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

        let requestIds = await Promise.all(
            prompts.map((prompt) => falAiModel.generateImage(prompt.prompt, modelId))
        );

        if (requestIds.includes(undefined)) {
            throw new Error("Image generation failed for one or more prompts");
        }

        const images = await prismaClient.outputImage.createManyAndReturn({
            data: prompts.map((prompt, index) => ({
                prompt: prompt.prompt,
                userId: "6cace30d-6d95-4ecc-b602-dfaac6f33805",
                modelId,
                falAiReqId: requestIds[index]!.request_id,
            }))
        });

        res.json({ msg: "Created images sussesfully", images: images.map(image => image.id) })
    } catch (error) {
        console.log("Could not genreate output images of the pack", error);
        res.status(500).json({ msg: "Could not genreate output images of the pack" });
    }

    res.json({ msg: "Welcome to generatePack router" });
});

export default generatePackRouter;