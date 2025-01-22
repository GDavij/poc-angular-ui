import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { createMemberController } from './create-member/create-member.controller';
import { updateMemberController } from './update-member/update-member.controller';
import { deleteMember } from './delete-member/delete-member.controller';
import { listMembersController } from './list-members/list-members.controller';
import { getMemberController } from './get-member/get-member.controller';

export function membersRoutes(fastify: FastifyInstance) {
    fastify.get('/', listMembersController);

    fastify.get('/:id', getMemberController);

    fastify.post('/', createMemberController);

    fastify.put('/:id', updateMemberController);

    fastify.delete('/members/:id', deleteMember);
}

export default membersRoutes;