import { FastifyReply, FastifyRequest } from "fastify";
import { getMemberSchema } from "./get-member.schema";
import { MembersRepository } from "../members.repository";
import { HttpResult } from "@models/results";

export function getMemberController(req: FastifyRequest, res: FastifyReply) {
  const {
    params: { id },
  } = getMemberSchema.parse(req);

  const repository = new MembersRepository;

  const result = repository.get(id);
  
  if (result) {
    return res.status(200).send(HttpResult.success(result));
  }

  return res.status(404).send(HttpResult.fails("Membro não encontrado"));
}
