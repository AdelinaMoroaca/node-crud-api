import { Product } from '../models/product';

const products = new Map<string, Product>();

export const db = {
  getAll: () => Array.from(products.values()),
  get: (id: string) => products.get(id),
  create: (product: Product) => {
    products.set(product.id, product);
    return product;
  },
  update: (id: string, data: Partial<Product>) => {
    const existing = products.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...data, id };
    products.set(id, updated);
    return updated;
  },
  delete: (id: string) => products.delete(id),
};