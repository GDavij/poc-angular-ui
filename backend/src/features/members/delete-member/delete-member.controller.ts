import { FastifyReply, FastifyRequest } from "fastify";
import { deleteMemberSchema } from "./delete-member.schema";
import { MembersRepository } from "../members.repository";
import { HttpResult } from "@models/results";

export function deleteMember(req: FastifyRequest, res: FastifyReply) {
  const {
    params: { id },
  } = deleteMemberSchema.parse(req);

  const repository = new MembersRepository;

  if (!repository.existsId(id)) {
    return res.status(404).send(HttpResult.fails("Membro não encontrado"));
  }

  repository.delete(id);

  return res.status(204).send(HttpResult.success(id));
}
