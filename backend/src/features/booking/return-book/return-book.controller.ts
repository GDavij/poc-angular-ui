import { FastifyReply, FastifyRequest } from "fastify";
import { returnBookSchema } from "./return-book.schema";
import { BorrowRecordsRepository } from "@features/shared/borrow-records.repository";
import { HttpResult } from "@models/results";

export function returnBookController(req: FastifyRequest, rep: FastifyReply) {
    const { params: { id } } = returnBookSchema.parse(req);

    const repository = new BorrowRecordsRepository();

    if (!repository.exists(id)) {
        return rep.status(404).send(HttpResult.fails("Registro não encontrado"));
    }

    if (!repository.isBookInUse(id)) {
        return rep.status(409).send(HttpResult.fails("Livro já devolvido"));
    }

    if (repository.returnBookForRecord(id)) {
        return rep.status(200).send(HttpResult.success("Livro devolvido com sucesso"));
    }

    return rep.status(500).send(HttpResult.fails("Erro ao devolver livro"));
} 