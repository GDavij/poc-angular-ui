import { FastifyReply, FastifyRequest } from "fastify";
import { createMemberSchema } from "./create-member.schema";
import { MembersRepository } from "../members.repository";
import { HttpResult } from "@models/results";
import { Member } from "@models/member";

export function createMemberController(req: FastifyRequest, res: FastifyReply) {
  const { body: payload } = createMemberSchema.parse(req.body);

  const repository = new MembersRepository();

  if (repository.existsEmail(payload.email)) {
    return res.status(400).send(HttpResult.fails("Email já cadastrado"));
  }

  const member: Member = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
  };

  const success = repository.save(member);
  if (success) {
    return res.status(201).send(HttpResult.success(member));
  }

  return res.status(500).send(HttpResult.fails("Erro ao salvar membro"));
}
