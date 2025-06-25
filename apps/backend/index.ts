import express from "express";
import cors from "cors"
import traningRouter from "./routes/traningRouter";
import generateImageRouter from "./routes/generateImageRouter";
import userRouter from "./routes/userRouter";
import generatePackRouter from "./routes/generatePackRouter";
import getImagesRouter from "./routes/getImagesRoute";
import FalAIWeebHookRouter from "./routes/falAiWeebHookRouter";

const app = express();

const port = process.env.BACKEND_PORT ?? 8080;

app.use(express.json());
app.use(cors()); // TODO update cors

app.use("/", traningRouter);
app.use("/", generateImageRouter);
app.use("/", generatePackRouter);
app.use("/", userRouter);
app.use("/", getImagesRouter);
app.use("/", FalAIWeebHookRouter);

app.get("/", (req, res) => {
    res.json({msg: "Hello!!"});
})

app.listen(port, () => {
    console.log(`---- Server is Running on port ${port} -----`)
})