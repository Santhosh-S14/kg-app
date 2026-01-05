# KG App - Web Frontend

A React-based web application for saving and managing URLs. This frontend application provides an inbox-style interface where users can save URLs, automatically extract page titles, and view their saved items.

## Features

- **Save URLs**: Paste and save any URL with automatic title extraction
- **Item List**: View all saved items in a chronological list
- **Item Details**: View detailed information about each saved item
- **Automatic Title Fetching**: The backend automatically extracts page titles from saved URLs
- **Error Handling**: User-friendly error messages for failed operations

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **ESLint** - Code linting

## Project Structure

```
web/
├── src/
│   ├── App.tsx          # Main inbox page with item list and URL input
│   ├── main.tsx         # Application entry point with routing
│   ├── pages/
│   │   └── Item.tsx      # Individual item detail page
│   ├── App.css          # App styles
│   └── index.css        # Global styles
├── public/              # Static assets
├── package.json         # Dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- The backend server running on `http://localhost:4000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## API Integration

The frontend communicates with the backend API at `http://localhost:4000`. The following endpoints are used:

- `GET /items` - Fetch all saved items
- `POST /items` - Create a new item (requires `{ url: string }` in body)
- `GET /items/:id` - Fetch a specific item by ID
- `GET /health` - Health check endpoint

## Development

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses ESLint for code quality. Make sure to run `npm run lint` before committing changes.

## Routes

- `/` - Main inbox page showing all saved items
- `/item/:id` - Individual item detail page

## Type Definitions

The application uses the following TypeScript type for items:

```typescript
type Item = {
  id: string;
  url: string;
  title: string | null;
  status: string;
  created_at: string;
};
```
