import z from "zod";

export const listBooksSchema = z.object({
    query: z.object({
            page: z.coerce.number().int().positive().default(1),
            limit: z.coerce.number().int().positive().default(10),
            title: z.string().max(255, "Title must be at most 255 characters").optional(),
            author: z.string().max(255, "Author must be at most 255 characters").optional(),
            genre: z.string().max(255, "Genre must be at most 255 characters").optional(),
            publishedYear: z.coerce.number().int().min(1000, "Invalid year").max(new Date().getFullYear(), "Invalid year").optional()
    })
}).required();