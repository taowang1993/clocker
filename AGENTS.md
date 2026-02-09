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

## PR Template

When opening PRs, follow the template in `.github/PULL_REQUEST_TEMPLATE.md`.

## Documentation

<!-- TAMAGUI-Docs-START -->
[Tamagui Docs Index]|root: /Users/max/context/documenting/tamagui/docs
|IMPORTANT: Prefer retrieval-led reasoning over pre-training-led reasoning for Tamagui tasks.
|components:{accordion-v2,alert-dialog-v2,anchor-v2,avatar-v2,button-v2,card-v2,checkbox-v2,context-menu-v2,dialog-v2,focus-scope-v2,form-v2,group-v2,headings-v2,html-elements-v2,image-v2,inputs-v2,intro-v2,label-v2,linear-gradient-v2,list-item-v2,lucide-icons-v2,menu-v2,native-v2,new-inputs-v2,popover-v2,portal-v2,progress-v2,radio-group-v2,scroll-view-v2,select-v2,separator-v2,shapes-v2,sheet-v2,slider-v2,spinner-v2,stacks-v2,switch-v2,tabs-v2,text-v2,toast-v2,toggle-group-v2,tooltip-v2,visually-hidden-v2}.mdx
|core:{animate-presence,animation-drivers,animations,animations-css,animations-motion,animations-react-native,animations-reanimated,config-v5,configuration,create-styled-context,exports,font-language,styled,theme,tokens,use-media,use-theme,variants,view-and-text}.mdx
|guides:{design-systems,expo,metro}.mdx
|intro:{colors,installation,props,styles,themes,tokens}.mdx
<!-- TAMAGUI-Docs-END -->
