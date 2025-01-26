import { FastifyReply, FastifyRequest } from "fastify";
import { getBookSchema } from "./get-book.schema";
import { BooksRepository } from "../books.repository";
import { HttpResult } from "@models/results";

export function getBookController(req: FastifyRequest, rep: FastifyReply) {
    const { params: { id } } = getBookSchema.parse(req);

    const repository = new BooksRepository();

    const book = repository.get(id);

    if (book) {
        return rep.status(200).send(HttpResult.success(book));
    }
    
    return rep.status(404).send(HttpResult.fails("Book not found"));
}