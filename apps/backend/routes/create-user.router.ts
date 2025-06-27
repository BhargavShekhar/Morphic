import { Router } from "express";
import prismaClient from "@repo/db";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
    const { username } = req.body;

    try {
        const createdUser = await prismaClient.user.create({
            data: { username }
        })

        res.json({ msg: "user created sucessfully", createdUser });
    } catch (error) {
        console.log("failed ❌ to create user", error);
        res.status(500).json({ msg: "Could not create user" });
    }
})

export default userRouter;