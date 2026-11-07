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

Production: https://eshop-one-kappa.vercel.app  
GitHub branch: `cursor/initial-express-backend` (linked Vercel project `eshop`)

Environment variables on Vercel:
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_REFRESH_TOKEN_SECRET`
- `CLIENT_URL`
- `NODE_ENV=production`

## Design / prototype

Interactive HTML prototype (home → shop → product → cart → checkout → orders):

- Open locally: `design/eshop-prototype.html`
- Matches the live storefront visual language (Fraunces + DM Sans, forest/sand palette)

Figma write access on this account is currently **View** seat, so a native Figma file could not be auto-created. Import the HTML prototype into Figma (or share a blank Design file URL) to sync editable frames.
