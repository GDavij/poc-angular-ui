import { FastifyReply, FastifyRequest } from "fastify";
import { listBooksSchema } from "@features/booking/list-books/list-books.schema";
import { BooksRepository } from "@features/booking/books.repository";
import { Book } from "@models/book";
import { HttpResult } from "@models/results";

export function listBooksController(req: FastifyRequest, rep: FastifyReply) {
    const { query: { page, limit, ...filter } } = listBooksSchema.parse(req);

    const repository = new BooksRepository();

    const books = repository.listPageFiltering(page, limit, filter as Book);

    return rep.status(200).send(HttpResult.success(books));
}