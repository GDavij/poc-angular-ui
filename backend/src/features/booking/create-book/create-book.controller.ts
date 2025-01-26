import { FastifyReply, FastifyRequest } from "fastify";
import { createBookSchema } from "./create-book.schema";
import { BooksRepository } from "../books.repository";
import { HttpResult } from "@models/results";
import { Book } from "@models/book";

export function createBookController(req: FastifyRequest, res: FastifyReply) {
  const { body: book } = createBookSchema.parse(req);

  const repository = new BooksRepository();

  if (repository.existSimilar(book)) {
    return res.status(409).send(HttpResult.fails("Livro já cadastrado"));
  }

  const success = repository.save(book);
  if (success) {
    return res.status(201).send(HttpResult.success(book));
  }

  return res.status(500).send(HttpResult.fails("Erro ao salvar livro"));
}