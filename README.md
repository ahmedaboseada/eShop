# eShop

Full-stack e-commerce app with a **React (Vite)** storefront and an **Express + MongoDB** API.

## Structure

```
client/   React storefront
server/   Express REST API
api/      Vercel serverless entry for the API
```

## Features

- JWT auth (signup / signin / protected routes)
- Categories, brands, and product catalog
- Cart and checkout with stock updates
- Order history
- Seeded demo catalog and users

## Local setup

1. Copy env template:

```bash
cp .env.example .env
```

2. Install and seed:

```bash
npm install
npm install --prefix client
npm install --prefix server
npm run seed
```

3. Run both apps:

```bash
npm run dev
```

- Storefront: http://localhost:5173  
- API: http://localhost:5000/api/health  

### Demo accounts

| Role     | Email            | Password   |
|----------|------------------|------------|
| Customer | demo@eshop.dev   | Demo123!   |
| Admin    | admin@eshop.dev  | Admin123!  |

## API overview

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/health` | no |
| POST | `/api/auth/signup` | no |
| POST | `/api/auth/signin` | no |
| GET | `/api/auth/me` | yes |
| GET | `/api/products` | no |
| GET | `/api/products/:id` | no |
| GET | `/api/categories` | no |
| GET | `/api/brands` | no |
| GET/POST/PATCH/DELETE | `/api/cart` | yes |
| GET/POST | `/api/orders` | yes |

## Deploy (Vercel + GitHub)

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Set environment variables:
   - `MONGODB_URI` (Atlas recommended)
   - `JWT_SECRET`
   - `JWT_REFRESH_TOKEN_SECRET`
   - `CLIENT_URL` (your Vercel URL)
   - `NODE_ENV=production`
4. Deploy. The SPA builds from `client/`, API routes rewrite to `/api`.

## Figma

Design file and prototype are linked from the project README updates after generation.
