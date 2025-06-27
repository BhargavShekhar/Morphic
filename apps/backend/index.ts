import express from "express";
import cors from "cors"
import traningRouter from "./routes/training.router";
import generateImageRouter from "./routes/generate-image.router";
import userRouter from "./routes/create-user.router";
import generatePackRouter from "./routes/generate-pack.router";
import getImagesRouter from "./routes/get-images.router";
import FalAIWeebHookTrainRouter from "./routes/falai-webhook-train.router";
import FalAIWeebHookImageRouter from "./routes/falai-webhook-image.router";
import presignedUrlRouter from "./routes/presigned-url.router";

const app = express();

const port = process.env.BACKEND_PORT ?? 8080;

app.use(express.json());
app.use(cors()); // TODO update cors

app.use("/ai/training", traningRouter);
app.use("/ai/generate", generateImageRouter);
app.use("/pack/generatePack", generatePackRouter);
app.use("/create-user", userRouter);
app.use("/images/bulk", getImagesRouter);
app.use("/falai/webhook/train", FalAIWeebHookTrainRouter);
app.use("/falai/webhook/image", FalAIWeebHookImageRouter);
app.use("/presigned-url", presignedUrlRouter);

app.listen(port, () => {
    console.log(`---- Server is Running on port ${port} -----`)
})