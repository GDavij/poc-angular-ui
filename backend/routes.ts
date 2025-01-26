import { FastifyInstance } from "fastify";
import { membersRoutes } from '@features/membership/membership.routes';
import bookingRoutes from "@features/booking/booking.routes";


export function registerRoutes(fastify: FastifyInstance) {
    fastify.register(membersRoutes, { prefix: '/api/members'});
    fastify.register(bookingRoutes, { prefix: '/api/booking'});
}