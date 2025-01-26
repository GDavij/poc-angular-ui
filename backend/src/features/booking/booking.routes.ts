import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { createBookController } from './create-book/create-book.controller';
import { updateBookController } from "@features/booking/update-book/update-book.controller";
import { deleteBookController } from "@features/booking/delete-book/delete-book.controller";
import { getBookController } from "@features/booking/get-book/get-book.controller";
import { listBooksController } from './list-books/list-books.controller';
import { borrowBookController } from './borrow-book/borrow-book.controller';
import { returnBookController } from './return-book/return-book.controller';

export function bookingRoutes(fastify: FastifyInstance) {
    fastify.patch("/books/:id", borrowBookController);
    fastify.post("/books", createBookController);
    fastify.delete("/books/:id", deleteBookController);
    fastify.get("/books/:id", getBookController);
    fastify.get("/books", listBooksController);
    fastify.patch("/:id", returnBookController);
    fastify.put("/books/:id", updateBookController);
}

export default bookingRoutes;