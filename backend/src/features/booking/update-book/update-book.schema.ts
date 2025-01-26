import z from "zod";

export const updateBookSchema = z.object({
    params: z.object({
        id: z.coerce.number().gt(0, "Id deve ser maior que 0").int("Id deve ser um número natural")
    }),
    body: z.object({
        title: z.string().min(1, "Title is required").max(255, "Title must be at most 255 characters"),
        author: z.string().min(1, "Author is required").max(255, "Author must be at most 255 characters"),
        genre: z.string().min(1, "Genre is required").max(255, "Genre must be at most 255 characters"),
        publishedYear: z.number().int().min(1000, "Invalid year").max(new Date().getFullYear(), "Invalid year")
    })
}).required();