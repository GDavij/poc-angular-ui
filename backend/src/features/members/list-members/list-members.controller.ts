import { FastifyReply, FastifyRequest } from "fastify";
import { listMembersSchema } from "./list-members.schema";
import { MembersRepository } from "../members.repository";
import { HttpResult } from "@models/results";

export function listMembersController(req: FastifyRequest, res: FastifyReply) {
  const {
    query: { limit, page },
  } = listMembersSchema.parse(req);

  const repository = new MembersRepository;

  return res.status(200).send(HttpResult.success(repository.listPage(page, limit)));
}
