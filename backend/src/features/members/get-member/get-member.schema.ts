import z from "zod";

export const getMemberSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive("Id inválido")
    })
});