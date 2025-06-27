import { TrainWebHookSchema } from "@repo/common/types";
import prismaClient from "@repo/db";
import { Router } from "express";

const FalAIWeebHookTrainRouter = Router();

FalAIWeebHookTrainRouter.get("/falai/webhook/train", async (req, res) => {
    const parsedData = TrainWebHookSchema.safeParse(req.body);

    if(!parsedData.success) {
        console.error("Invalid request data:", parsedData.error);
        res.status(400).json({ error: "Invalid request data" });
        return;
    }

    const request_id = parsedData.data.request_id;
    const tensor_path = parsedData.data.tensor_path;

    try {
        await prismaClient.model.updateMany({
            where: { falAiReqId: request_id },
            data: {
                traningStatus: "COMPLETED",
                tensorPath: tensor_path,
            },
        });

        res.json({ msg: "Model training completed successfully" });
    } catch (error) {
        console.error("Error updating model:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ msg: "Welcome to FalAI webhook router" });
});

export default FalAIWeebHookTrainRouter;