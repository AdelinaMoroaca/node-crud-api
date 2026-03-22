import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { db } from '../db/memory';
import { productSchema, productIdSchema } from '../utils/validation';
import { randomUUID } from 'crypto';

export async function productRoutes(fastify: FastifyInstance) {
  fastify.get('/products', async (_, reply) => {
    reply.code(200).send(db.getAll());
  });

  fastify.get('/products/:productId', async (request, reply) => {
    const { productId } = request.params as { productId: string };
    try {
      productIdSchema.parse(productId);
    } catch {
      return reply.code(400).send({ message: 'Invalid productId (not uuid)' });
    }
    const product = db.get(productId);
    if (!product) return reply.code(404).send({ message: 'Product not found' });
    reply.code(200).send(product);
  });

  fastify.post('/products', async (request, reply) => {
    try {
      const data = productSchema.parse(request.body);
      const product = { ...data, id: randomUUID() };
      db.create(product);
      reply.code(201).send(product);
    } catch (e: any) {
      reply.code(400).send({ message: e.errors?.[0]?.message || 'Invalid data' });
    }
  });

  fastify.put('/products/:productId', async (request, reply) => {
    const { productId } = request.params as { productId: string };
    try {
      productIdSchema.parse(productId);
    } catch {
      return reply.code(400).send({ message: 'Invalid productId (not uuid)' });
    }
    try {
      const data = productSchema.parse(request.body);
      const updated = db.update(productId, data);
      if (!updated) return reply.code(404).send({ message: 'Product not found' });
      reply.code(200).send(updated);
    } catch (e: any) {
      reply.code(400).send({ message: e.errors?.[0]?.message || 'Invalid data' });
    }
  });

  fastify.delete('/products/:productId', async (request, reply) => {
    const { productId } = request.params as { productId: string };
    try {
      productIdSchema.parse(productId);
    } catch {
      return reply.code(400).send({ message: 'Invalid productId (not uuid)' });
    }
    const deleted = db.delete(productId);
    if (!deleted) return reply.code(404).send({ message: 'Product not found' });
    reply.code(204).send();
  });
}