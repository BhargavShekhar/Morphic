import { BaseModel } from "./BaseMode";
import { fal } from "@fal-ai/client";

export class FalAIModel extends BaseModel {
    constructor() {
        super();
    }

    override async generateImage(prompt: string, tensorPath: string): Promise<any> {
        const { request_id, response_url } = await fal.queue.submit("fal-ai/flux-lora", {
            input: {
                prompt: prompt,
                loras: [{ path: tensorPath, scale: 1 }]
            }
        });

        return { request_id, response_url }
    }

    protected override async trainModel(zipUrl: string, triggerWord: string): Promise<any> {
        const { request_id } = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
            input: {
                images_data_url: zipUrl
            },
            webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fall-ai/webhook`,
        });

        return request_id;
    }
}