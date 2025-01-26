import { FastifyReply, FastifyRequest } from "fastify";
import { deleteBookSchema } from "./delete-book.schema";
import { BooksRepository } from "../books.repository";
import { HttpResult } from "@models/results";

export async function deleteBookController(req: FastifyRequest, rep: FastifyReply) {
    const { params: { id } } = deleteBookSchema.parse(req);

    const repository = new BooksRepository();

    if (!repository.existsId(id)) {
        return rep.status(404).send(HttpResult.fails("Livro não encontrado"));
    }

    const success = repository.delete(id);
    if (success) {
        return rep.status(204).send(HttpResult.success(null));
    }


}