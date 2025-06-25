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
    // images: z.array(z.string())
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