import z from "zod";

export const returnBookSchema = z.object({
    params: z.object({
        id: z.coerce.number().gt(0, "Id deve ser maior que 0").int("Id deve ser um número natural")
    })
})