import { FastifyInstance } from "fastify";
import {membersRoutes} from '@features/membership/members.routes';


export function registerRoutes(fastify: FastifyInstance) {
    fastify.register(membersRoutes, { prefix: '/api/members'});
}