import Fastify from 'fastify'
import { registerRoutes } from './routes'
import cors from '@fastify/cors';

const fastify = Fastify({
  logger: true
})


fastify.register(cors, {
  allowedHeaders: '*',
  origin: '*',
  methods: '*',
})
registerRoutes(fastify);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();