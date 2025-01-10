import { FastifyReply, FastifyRequest } from "fastify";
import { listMembersSchema } from "./list-members.schema";
import { MembersRepository } from "../members.repository";
import { HttpResult } from "@models/results";

export function listMembersController(req: FastifyRequest, res: FastifyReply) {
  const {
    query: { limit, page, email, phone },
  } = listMembersSchema.parse(req);

  const repository = new MembersRepository;

  return res.status(200).send(HttpResult.success(repository.listPageFilteringEmailAndAge(page, limit, email, phone)));
}
