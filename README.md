# Product Catalog CRUD API

A Fastify-based CRUD API for managing a Product Catalog, using an in-memory database. Supports development, production, and multi-instance (horizontal scaling) modes.

---

## Features

- CRUD operations for products (Create, Read, Update, Delete)
- Input validation with Zod
- In-memory database
- Comprehensive error handling
- Environment configuration via `.env`
- Development and production modes
- Horizontal scaling with Node.js Cluster API and round-robin load balancing
- API tests (minimum 3 scenarios)

---

## Requirements

- Node.js v24.10.0 or higher
- npm

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder># Product Catalog CRUD API

A Fastify-based CRUD API for managing a Product Catalog, using an in-memory database. Supports development, production, and multi-instance (horizontal scaling) modes.

---

## Features

- CRUD operations for products (Create, Read, Update, Delete)
- Input validation with Zod
- In-memory database
- Comprehensive error handling
- Environment configuration via `.env`
- Development and production modes
- Horizontal scaling with Node.js Cluster API and round-robin load balancing
- API tests (minimum 3 scenarios)

---

## Requirements

- Node.js v24.10.0 or higher
- npm

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>

Install dependencies:

 

npm install
Environment setup:

Copy .env.example to .env and adjust as needed:
 

cp .env.example .env
Note: .env is ignored by git for security. Only .env.example is committed.
Environment Variables
Variable	Description	Default
PORT	Application port	4000
Running the Application
Development Mode
Uses nodemon, ts-node-dev, or tsx for hot-reloading.
Start with:
bash


npm run start:dev
Production Mode
Builds and runs the bundled file.
Start with:
bash


npm run start:prod
Multi-instance Mode (Horizontal Scaling)
Uses Node.js Cluster API and round-robin load balancing.
Starts multiple worker instances (parallelism - 1), each on PORT + n.
Load balancer listens on PORT.
Start with:
bash


npm run start:multi
API Endpoints
Product Object
json


{
  "id": "string (uuid)",
  "name": "string",
  "description": "string",
  "price": "number (>0)",
  "category": "string",
  "inStock": "boolean"
}


Endpoints
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/products/{productId}	Get product by ID
POST	/api/products	Create a new product
PUT	/api/products/{productId}	Update product by ID
DELETE	/api/products/{productId}	Delete product by ID
Error Handling
400: Invalid UUID or request body
404: Product not found or endpoint not found
500: Internal server error
Usage Examples
Get all products
bash


curl -X GET http://localhost:4000/api/products
Create a product
bash


curl -X POST http://localhost:4000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Book","description":"A great book","price":10.99,"category":"books","inStock":true}'
Get product by ID
bash


curl -X GET http://localhost:4000/api/products/<productId>
Update product
bash


curl -X PUT http://localhost:4000/api/products/<productId> \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Book","description":"Updated desc","price":12.99,"category":"books","inStock":false}'
Delete product
bash


curl -X DELETE http://localhost:4000/api/products/<productId>
Testing
Run API tests:
bash


npm test
Test scenarios include:
GET all products (expect empty array)
POST a new product (expect created record)
GET by ID (expect created record)
PUT update (expect updated record)
DELETE by ID (expect successful deletion)
GET deleted product (expect 404)
Horizontal Scaling
When running in multi-instance mode, the load balancer distributes requests across worker instances using round-robin.
Database state is consistent across workers.
Notes
Product IDs are generated using Node.js randomUUID.
Only allowed libraries are used as per assignment requirements.
.env is not committed; use .env.example for reference.
