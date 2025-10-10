# PopShelf

PopShelf is a full-stack catalog for books, movies, games, and other pop-culture collectibles. The backend is a Ruby on Rails 7.1 JSON API that manages products, media uploads, and JWT-based admin authentication. The frontend is a React SPA that consumes the API, offers product search and detail views, and gates admin CRUD tools behind login.

## ✨ Features

- Product catalog with title, author, release year, price, genre, rating, and optional cover image.
- Active Storage support for file uploads and signed URLs for product cover photos.
- JWT-powered admin authentication with secure password storage via `bcrypt`.
- React-based client with search, protected admin routes, and Japanese/English UI copy.
- Seed data for quick demos, including a default admin account.

## 🏗️ Architecture

```
PopShelf
├── backend/    # Rails 7.1 API-only application
│   ├── app/    # Models, controllers, jobs
│   ├── config/ # Environment, routes, initializers (CORS, JWT, etc.)
│   └── db/     # Migrations and seeds for products and users
└── frontend/   # React 19 SPA (Create React App)
		├── src/    # Pages, components, routing, styles
		└── public/ # Static assets
```

## 🧰 Tech Stack

- **Backend:** Ruby 3.4.3, Rails 7.1 (API mode), Active Storage, JWT, Rack CORS, SQLite (dev/test).
- **Frontend:** React 19 (CRA), React Router 7, Testing Library.
- **Tooling:** Bundler, npm, Dockerfile for production builds, Kamal deployment scaffolding.

## ✅ Prerequisites

- Ruby `3.4.3` and Bundler (`gem install bundler`).
- Node.js `>= 18` and npm.
- SQLite 3 for local persistence.
- (Optional) Docker 24+ for containerized production builds.

## 🚀 Quick Start

### 1. Clone and install dependencies

```bash
git clone https://github.com/dacsocodelam/PopShelf-111.git
cd PopShelf-111
```

### 2. Backend (Rails API)

```bash
cd backend
bundle install
bin/rails db:setup      # creates, migrates, and seeds the database
bin/rails server
```

The API listens on `http://localhost:3000` by default. Ensure `config/master.key` is present; if you generated credentials on another machine, copy the `master.key` or set the `RAILS_MASTER_KEY` environment variable before booting.

Seed data creates:

- Sample products (books, films, games) for the catalog.
- Admin user `admin@example.com` with password `popshelf22`.

### 3. Frontend (React SPA)

```bash
cd ../frontend
npm install
set PORT=3001 && npm start   # Windows PowerShell: $env:PORT=3001; npm start
```

The React dev server runs on `http://localhost:3001`. Update the `PORT` if you adjust the CORS origins in `backend/config/initializers/cors.rb` (defaults allow 3001). The frontend expects the backend at `http://localhost:3000`; change the hard-coded URLs in `src/pages/Home.js` and `src/pages/Login/Login.js` if you deploy elsewhere.

### 4. Login as admin

1. Visit `http://localhost:3001/login`.
2. Sign in with the seeded credentials.
3. JWT is stored in `localStorage`; authenticated requests include the `Authorization: Bearer <token>` header.

## 🧪 Testing

- **Rails:** `bin/rails test`
- **React:** `npm test`

Both suites run against local fixtures. Ensure the backend database is migrated before executing tests.

## 🔐 Configuration

| Variable           | Where              | Description                                                                                                                  |
| ------------------ | ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `RAILS_MASTER_KEY` | Backend            | Required in production or when `config/master.key` is unavailable locally. Unlocks encrypted credentials (JWT secret, etc.). |
| `JWT_SECRET_KEY`   | Backend (optional) | Override the default `Rails.application.secret_key_base` if you want a dedicated secret for tokens.                          |
| `FRONTEND_ORIGIN`  | Backend (optional) | Update `config/initializers/cors.rb` with your frontend URL(s).                                                              |

Active Storage stores files on the local disk by default (`storage/` directory). Configure another service via `config/storage.yml` for production.

## 📡 API Reference

All endpoints are namespaced under `/api/v1`.

| Method      | Endpoint        | Auth | Description                                                                                                 |
| ----------- | --------------- | ---- | ----------------------------------------------------------------------------------------------------------- |
| `POST`      | `/login`        | ➖   | Returns `{ user, token }` for valid credentials.                                                            |
| `GET`       | `/products`     | ➖   | List products (includes `cover_photo_url` if attached). Future keyword filtering can use `?keyword=` query. |
| `GET`       | `/products/:id` | ➖   | Fetch a single product.                                                                                     |
| `POST`      | `/products`     | ✅   | Create a product. Accepts multipart form data for `cover_photo`.                                            |
| `PATCH/PUT` | `/products/:id` | ✅   | Update product attributes or replace the cover photo.                                                       |
| `DELETE`    | `/products/:id` | ✅   | Delete a product.                                                                                           |

Authenticated routes require `Authorization: Bearer <JWT>`.

### Payload template

```json
{
  "product": {
    "name": "The Legend of Zelda",
    "description": "Open-world adventure",
    "author": "Nintendo",
    "release_year": 2017,
    "price": 59.99,
    "genre": "Game",
    "rating": 5,
    "cover_photo": "<binary file>"
  }
}
```

## 🐳 Deploying with Docker

The backend includes a production-focused Dockerfile.

```bash
docker build -t popshelf-backend ./backend
docker run --rm -p 3000:80 \
	-e RAILS_MASTER_KEY=$(cat backend/config/master.key) \
	popshelf-backend
```

On Windows `cmd.exe`, replace the subshell with `type backend\config\master.key`.

For multi-host deployments, the repository ships with Kamal configuration under `.kamal/` to orchestrate remote container rollout.

## 📦 Useful Scripts

- `bin/dev` (backend) – start Rails with Hotwire-ready dev setup.
- `bin/rails db:reset` – rebuild database from scratch.
- `npm start` (frontend) – launch the development server on the configured port.
- `npm run build` (frontend) – bundle the React app for production.

## 🧭 Roadmap & Ideas

- Extract API URLs and environment constants (e.g., `REACT_APP_API_URL`).
- Extend keyword search into full-text or category filters.
- Add user registration and role-based permissions.
- Configure cloud storage (S3, GCS) for cover photos in production.

## 🤝 Contributing

1. Fork the repo and create a feature branch.
2. Keep commits focused on a single change.
3. Run both Rails and React test suites before opening a PR.
4. Document any new environment variables or setup steps.

## 📄 License

This project currently has no explicit license. Add one under `LICENSE` before distributing publicly.
