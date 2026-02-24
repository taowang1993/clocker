# Clocker

Clocker is a cross-platform personal AI assistant.

## Tech Stack

| Layer      | Technology           |
| ---------- | -------------------- |
| Desktop    | React + Electron     |
| Mobile     | Expo + Expo Web      |
| Mobile UI  | Tamagui              |
| Desktop UI | Tailwind + Shadcn/ui |
| BaaS       | Convex               |
| Auth       | Better-Auth          |
| Build      | Turborepo            |

## Planned / Optional

- Lists: FlashList
- State: Zustand
- Local DB: SQLite + Drizzle + better-sqlite3
- Payments: Stripe

## Project Structure

```
apps
├── native
│   ├── app
│   ├── assets
│   ├── components
│   └── lib
└── web
    ├── electron
    └── src
packages
├── backend
│   └── convex
├── config
├── env
│   └── src
└── ui
    ├── src
    └── types
```
