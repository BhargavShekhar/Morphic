import { z } from "zod";

export const TrainModelSchema = z.object({
    name: z.string(),
    type: z.enum(["Man", "Woman", "Others"]),
    age: z.number(),
    ethinicity: z.enum([
        "WHITE",
        "BLACK",
        "ASIAN_AMERICAN",
        "EAST_ASIAN",
        "SOUTH_EAST_ASIAN",
        "SOUTH_ASIAN",
        "MIDDLE_EASTERN",
        "PACIFIC",
        "HISPANIC",
    ]),
    eyeColor: z.enum([
        "Brown",
        "Blue",
        "Hazel",
        "Gray"
    ]),
    bald: z.boolean(),
    zipUrl: z.string()
})

export const GenerateImageSchema = z.object({
    prompt: z.string(),
    modelId: z.string(),
    num: z.number()
})

export const GenerateImageFromPackSchema = z.object({
    modelId: z.string(),
    packId: z.string()
})

export const TrainWebHookSchema = z.object({
    request_id: z.string(),
    tensor_path: z.string()
})

export const ImageWebHookSchema = z.object({
    request_id: z.string(),
    image_url: z.string()
})