import { Router } from "express";
import { TrainModelSchema } from "@repo/common/types"
import prismaClient from "@repo/db"
import { FalAIModel } from "../models/FalAIModel";

const traningRouter = Router();

const falAiModel = new FalAIModel();

traningRouter.post("/ai/training", async (req, res) => {
    const parsedBody = TrainModelSchema.safeParse(req.body);
    
    if(!parsedBody.success) {
        res.status(411).json({ msg: "Incorrect Input Format!!" });
        return;
    }
    
    const { name, age, bald, ethinicity, eyeColor, type , zipUrl} = parsedBody.data;
    try {
        const { request_id, response_url } = await falAiModel.trainModel(zipUrl, name);

        const createdModel = await prismaClient.model.create({
            data: {
                name,
                age,
                bald,
                ethinicity,
                eyeColor,
                type,
                userId: "6cace30d-6d95-4ecc-b602-dfaac6f33805",  // TODO : Change this to the actual user ID
                zipUrl,
                falAiReqId: request_id
            }
        })

        res.json({ msg: "Model created sucessfully", modelId: createdModel.id })
    } catch (error) {
        console.log("Error training model:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default traningRouter;