import { FastifyReply, FastifyRequest } from "fastify";
import { borrowBookSchema } from "./borrow-book.schema";
import { BooksRepository } from "../books.repository";
import { MembersRepository } from "@features/membership/members.repository";
import { HttpResult } from "@models/results";
import { BorrowRecordsRepository } from "@features/shared/borrow-records.repository";

export function borrowBookController(req: FastifyRequest, rep: FastifyReply) {
    const { params: { id }, body: { userId }} = borrowBookSchema.parse(req);

    const booksRepository = new BooksRepository();
    const membersRepository = new MembersRepository();

    if (!booksRepository.existsId(id)) {
        return rep.status(404).send(HttpResult.fails("Livro não encontrado"));
    }

    if (!membersRepository.existsId(userId)) {
        return rep.status(404).send(HttpResult.fails("Membro não encontrado"));
    }

    const borrowRecordsRepository = new BorrowRecordsRepository();
    if (borrowRecordsRepository.isBookInUse(id)) {
        return rep.status(409).send(HttpResult.fails("Livro já está emprestado"));
    }

    if (borrowRecordsRepository.borrowBookFor(id, userId)) {
        return rep.status(204).send(HttpResult.success("Livro emprestado com sucesso"));
    }

    return rep.status(500).send(HttpResult.fails("Erro ao emprestar livro"));
} 