import { FastifyReply, FastifyRequest } from "fastify";
import { updateMemberSchema } from "./update-member.schema";
import { MembersRepository } from "../members.repository";
import { HttpResult } from "@models/results";
import { Member } from "@models/member";

export function updateMemberController(req: FastifyRequest, res: FastifyReply) {
    const { body: payload, params: {id}} = updateMemberSchema.parse(req);

    const repository = new MembersRepository;

    if (!repository.existsId(id)) {
        return res.status(400).send({message: "Membro não encontrado"});
    }

    const member = {
        id,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
    } as Member;

    const success = repository.save(member);
    if (success) {
        return res.status(202).send(HttpResult.success(member));
    }

    return res.status(500).send(HttpResult.fails("Erro ao salvar membro"));
}