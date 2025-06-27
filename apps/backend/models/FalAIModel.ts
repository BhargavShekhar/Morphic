import { BaseModel } from "./BaseMode";
import { fal } from "@fal-ai/client";

export class FalAIModel extends BaseModel {
    constructor() {
        super();
    }

    public override async generateImage(prompt: string, tensorPath: string): Promise<any> {
        const { request_id, response_url } = await fal.queue.submit("fal-ai/flux-lora", {
            input: {
                prompt: prompt,
                loras: [{ path: tensorPath, scale: 1 }]
            },
            webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fal-ai/webhook/image`,
        });

        return { request_id, response_url }
    }

    public override async trainModel(zipUrl: string, triggerWord: string): Promise<any> {
        const { request_id } = await fal.queue.submit("fal-ai/flux-lora-fast-training", {
            input: {
                images_data_url: zipUrl,
                trigger_word: triggerWord
            },
            webhookUrl: `${process.env.WEBHOOK_BASE_URL}/fall-ai/webhook/train`,
        });

        return request_id;
    }
}