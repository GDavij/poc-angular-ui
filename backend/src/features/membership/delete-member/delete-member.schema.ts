import z from "zod";

export const deleteMemberSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive("Id inválido")
    })
})