export class BaseModel {
    constructor() {}

    protected async generateImage(prompt: string, tensorPath: string) {}

    protected async trainModel(zipUrl: string, triggerWord: string) {}
}