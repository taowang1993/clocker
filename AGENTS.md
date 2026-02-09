# Clockie

Clockie is a cross-platform personal AI assistant.

## Tech Stack

| Layer      | Technology           |
| ---------- | -------------------- |
| Desktop    | React + Electron     |
| Mobile     | Expo + Expo Web      |
| Mobile UI  | Tamagui              |
| Desktop UI | Tailwind + Shadcn/ui |
| Lists      | FlashList            |
| State      | Zustand              |
| BaaS       | Convex               |
| Local DB   | SQLite + Drizzle     |
| Auth       | Better-Auth          |
| Payments   | Stripe               |
| Build      | Turborepo            |

## Project Structure

apps
├── native         # Mobile client (Expo)
│   ├── app
│   ├── assets
│   ├── components
│   └── lib
└── web            # Desktop client (React + Electron)
    └── src
packages
├── backend        # Convex
│   └── convex
├── config         # Shared tsconfig
└── env            # Environment variables
    └── src

## Software Architecture

WIP

## Development

| Command                | Description        |
| ---------------------- | ------------------ |
| `pnpm run dev`         | Start all apps     |
| `pnpm run build`       | Build all apps     |
| `pnpm run dev:web`     | Start web only     |
| `pnpm run dev:native`  | Start native only  |
| `pnpm run dev:setup`   | Configure Convex   |
| `pnpm run check-types` | Typecheck all apps |
