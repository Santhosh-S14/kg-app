# KG App

A full-stack web application for saving and managing URLs with automatic title extraction. Think of it as a personal inbox for web links you want to save for later.

## Overview

KG App is a monorepo containing:
- **Frontend**: React + TypeScript SPA for managing saved URLs
- **Backend**: Express.js REST API with PostgreSQL database
- **Database**: PostgreSQL 16 running in Docker

## Features

- ✅ Save URLs with automatic title extraction
- ✅ View all saved items in chronological order
- ✅ View detailed information about each item
- ✅ RESTful API for programmatic access
- ✅ PostgreSQL database for persistent storage

## Tech Stack

### Frontend (`web/`)
- React 19
- TypeScript
- Vite
- React Router DOM

### Backend (`server/`)
- Node.js
- Express.js
- TypeScript
- PostgreSQL (via `pg`)
- Zod (validation)
- dotenv (environment variables)

### Infrastructure
- Docker & Docker Compose
- PostgreSQL 16

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd kg-app
```

### 2. Start the Database

Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d
```

This will start PostgreSQL on port `5432` with:
- Database: `kg`
- User: `postgres`
- Password: `postgres`

### 3. Initialize the Database Schema

Run the SQL schema to create the necessary tables:

```bash
# Using psql (if installed)
psql -h localhost -U postgres -d kg -f server/sql/schema.sql

# Or using Docker
docker exec -i kg-app-db-1 psql -U postgres -d kg < server/sql/schema.sql
```

### 4. Set Up the Backend

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `server/` directory:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/kg
PORT=4000
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:4000`

### 5. Set Up the Frontend

1. Open a new terminal and navigate to the web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the next available port)

## Project Structure

```
kg-app/
├── server/                 # Backend API
│   ├── src/
│   │   └── index.ts       # Express server and API routes
│   ├── sql/
│   │   └── schema.sql     # Database schema
│   ├── package.json
│   └── tsconfig.json
├── web/                   # Frontend React app
│   ├── src/
│   │   ├── App.tsx        # Main inbox page
│   │   ├── main.tsx       # App entry point
│   │   └── pages/
│   │       └── Item.tsx   # Item detail page
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml     # PostgreSQL service
└── README.md
```

## API Endpoints

### Health Check
- `GET /health` - Returns server status

### Items
- `GET /items` - Get all items (ordered by created_at desc)
- `POST /items` - Create a new item
  - Body: `{ "url": "https://example.com" }`
  - Automatically extracts page title
- `GET /items/:id` - Get a specific item by ID

### Response Format

**Item Object:**
```json
{
  "id": "uuid",
  "url": "https://example.com",
  "title": "Example Domain",
  "status": "inbox",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

## Development

### Running in Development Mode

1. **Database**: `docker-compose up -d` (runs in background)
2. **Backend**: `cd server && npm run dev`
3. **Frontend**: `cd web && npm run dev`

### Building for Production

**Backend:**
```bash
cd server
npm run build  # If build script exists
```

**Frontend:**
```bash
cd web
npm run build
```

The built files will be in `web/dist/`

### Environment Variables

**Backend** (`server/.env`):
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 4000)

## Database Schema

The application uses a single `items` table:

```sql
create table items (
  id uuid primary key default uuid_generate_v4(),
  url text not null,
  title text,
  status text not null default 'inbox',
  created_at timestamptz not null default now()
);
```

## Troubleshooting

### Database Connection Issues
- Ensure Docker Compose is running: `docker-compose ps`
- Check if PostgreSQL is accessible: `docker-compose logs db`
- Verify `DATABASE_URL` in `server/.env` matches Docker Compose settings

### Port Conflicts
- Backend default port: 4000 (change via `PORT` env variable)
- Frontend default port: 5173 (Vite will auto-increment if busy)
- Database port: 5432

### Module System Errors
- Ensure `server/package.json` has `"type": "module"` for ES modules
- Use `tsx` instead of `ts-node-dev` if you encounter ES module issues

## License

ISC
