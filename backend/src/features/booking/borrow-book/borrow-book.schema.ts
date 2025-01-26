import z from "zod";

export const borrowBookSchema = z.object({
    params: z.object({
        id: z.coerce.number().gt(0, "Id deve ser maior que 0").int("Id deve ser um número natural")
    }),
    body: z.object({
        // Should not be done like this, just simplicity
        userId: z.coerce.number().gt(0, "Id deve ser maior que 0").int("Id deve ser um número natural"),
    })
})