import { ImageWebHookSchema } from "@repo/common/types";
import prismaClient from "@repo/db";
import { Router } from "express";

const FalAIWeebHookImageRouter = Router();

FalAIWeebHookImageRouter.get("/falai/webhook/image", async (req, res) => {
    const parsedData = ImageWebHookSchema.safeParse(req.body);

    if (!parsedData.success) {
        console.error("Invalid request data:", parsedData.error);
        res.status(400).json({ error: "Invalid request data" });
        return;
    }

    const { request_id, image_url } = parsedData.data;

    try {
        await prismaClient.outputImage.updateMany({
            where: { falAiReqId: request_id },
            data: {
                status: "COMPLETED",
                imageUrl: image_url,
            },
        });
    } catch (error) {
        console.error("Error updating model:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
    }

    res.json({ msg: "Welcome to FalAI webhook image router" });
});

export default FalAIWeebHookImageRouter;