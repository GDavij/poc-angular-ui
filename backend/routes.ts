import { FastifyInstance } from "fastify";
import {membersRoutes} from '@features/members/members.routes';


export function registerRoutes(fastify: FastifyInstance) {
    fastify.register(membersRoutes, { prefix: '/api/members'});
}