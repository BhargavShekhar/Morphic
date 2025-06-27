import { Router } from "express";
import { S3Client } from "bun"

const presignedUrlRouter = Router();

presignedUrlRouter.get("/", async (req, res) => {
    const key = `models/${Date.now()}_${Math.random().toString(36)}.zip`;
    // const credentials = {
    //     accessKeyId: process.env.S3_ACCESS_KEY,
    //     secretAccessKey: process.env.S3_SECRET_KEY,
    //     bucket: process.env.S3_BUCKET_NAME,
    //     // endpoint: "https://s3.us-east-1.amazonaws.com", // Optional, for custom endpoints
    // };

    // const url = S3Client.presign("your-object-key", {
    //     ...credentials,
    //     expiresIn: 3600, // URL validity in seconds (e.g., 1 hour)
    //     // method: "PUT" // Optional, defaults to GET. Use PUT for uploads
    // });

    res.json({ key });
});

export default presignedUrlRouter;