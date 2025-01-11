import z from "zod";

export const listMembersSchema = z.object({
    query: z.object({
        page: z.coerce.number().int().positive().default(1),
        limit: z.coerce.number().int().positive().default(10),
        email: z.string().max(255, "Email deve ter no máximo 255 caracteres").optional(),
        phone: z.string().min(0, "Idade inválida").max(11, "Telefone inválido").optional()
    })
})