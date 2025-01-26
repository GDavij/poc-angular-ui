import { FastifyReply, FastifyRequest } from "fastify";
import { updateBookSchema } from "./update-book.schema";
import { BooksRepository } from "../books.repository";
import { HttpResult } from "@models/results";

export function updateBookController(req: FastifyRequest, rep: FastifyReply) {
    const { params: { id }, body: book } = updateBookSchema.parse(req);

    const repository = new BooksRepository();

    if (!repository.get(id)) {
        return rep.status(404).send(HttpResult.fails("Livro não encontrado"));
    }

    if (repository.existSimilar(book)) {
        return rep.status(409).send(HttpResult.fails("Livro já cadastrado"));
    }

    const success = repository.save({id, ...book});

    if (success) {
        return rep.status(204).send(HttpResult.success(null));
    }

    return rep.status(500).send(HttpResult.fails("Erro ao salvar livro"));
}