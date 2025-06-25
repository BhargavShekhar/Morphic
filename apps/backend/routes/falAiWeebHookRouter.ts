import { Router } from "express";

const FalAIWeebHookRouter = Router();

FalAIWeebHookRouter.get("/falai/webhook", (req, res) => {
    console.log(req.body);
    // update the training status in the database
    res.json({ msg: "Welcome to FalAI webhook router" });
});

export default FalAIWeebHookRouter;