import fastify from 'fastify';
import * as dotenv from 'dotenv';
import { productRoutes } from './routes/products.js'; // extensia .js este OBLIGATORIE cu NodeNext/ESM

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = fastify();

app.register(productRoutes, { prefix: '/api' });

app.setNotFoundHandler((request, reply) => {
  reply.code(404).send({ message: 'Resource not found' });
});

app.setErrorHandler((error, request, reply) => {
  if (!reply.statusCode || reply.statusCode === 200) {
    reply.code(500);
  }
  // Type guard pentru error.message
  const errorMessage =
    typeof error === 'object' && error && 'message' in error
      ? (error as { message: string }).message
      : String(error);

  reply.send({ message: 'Internal server error', error: errorMessage });
});

app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});