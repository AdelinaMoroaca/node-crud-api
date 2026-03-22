import fastify from 'fastify';
import { productRoutes } from '../src/routes/products';
import supertest from 'supertest';

let app: ReturnType<typeof fastify>;

beforeAll(async () => {
  app = fastify();
  app.register(productRoutes, { prefix: '/api' });
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

describe('Product API', () => {
  let productId: string;

  it('GET /api/products returns empty array', async () => {
    const res = await supertest(app.server).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/products creates a product', async () => {
    const product = {
      name: 'Book',
      description: 'A great book',
      price: 10.99,
      category: 'books',
      inStock: true
    };
    const res = await supertest(app.server)
      .post('/api/products')
      .send(product);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(product);
    expect(res.body.id).toBeDefined();
    productId = res.body.id;
  });

  it('GET /api/products/:id returns the created product', async () => {
    const res = await supertest(app.server).get(`/api/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(productId);
  });

  // Add more tests as needed (update, delete, error cases, etc.)
});