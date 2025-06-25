import { Router } from "express";
import { TrainModelSchema } from "@repo/common/types"
import prismaClient from "@repo/db"

const traningRouter = Router();

traningRouter.post("/ai/training", async (req, res) => {
    const parsedBody = TrainModelSchema.safeParse(req.body);
    
    if(!parsedBody.success) {
        res.status(411).json({ msg: "Incorrect Input Format!!" });
        return;
    }
    
    const { name, age, bald, ethinicity, eyeColor, type } = parsedBody.data;
    try {
        const createdModel = await prismaClient.model.create({
            data: {
                name,
                age,
                bald,
                ethinicity,
                eyeColor,
                type,
                userId: "6cace30d-6d95-4ecc-b602-dfaac6f33805"
            }
        })

        res.json({ msg: "Model created sucessfully", modelId: createdModel.id })
    } catch (error) {
        
    }

    res.json({ msg: "Welcome to traning router" })
})

export default traningRouter;