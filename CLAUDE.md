# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
bun run dev          # Start Vite dev server with HMR

# Build & Check
bun run build        # TypeScript check + Vite production build
bun run typecheck    # TypeScript check only (no emit)
bun run lint         # oxlint with auto-fix
bun run format       # Format with oxfmt
bun run format:check # Check formatting without modifying
bun run preview      # Preview production build

# Testing
bun run test         # Run tests once
bun run test:watch   # Run tests in watch mode
```

## Architecture

This is a React learning app that teaches SwiftUI to React developers through side-by-side code comparisons.

### Data Flow

```
lessons.ts (content) → React Router → LessonView → CodeComparison → CodeBlock
```

- **Routing** - Uses React Router with routes for each lesson (`/lessons/:id`)
- **Sidebar** - Always visible, uses `<Link>` components for navigation
- **Lessons** - Defined in `src/data/lessons.ts` as typed objects with categories and sections

### Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Welcome | Home page with "Get Started" button |
| `/lessons/:id` | LessonView | Individual lesson page |

### Lesson Structure

Each lesson contains sections with React/SwiftUI code pairs:

```typescript
interface Lesson {
  id: string;
  title: string;
  category: string; // Used for grouping in sidebar
  sections: LessonSection[];
}

interface LessonSection {
  title: string;
  explanation: string; // Markdown-ish: **bold** and `code` are parsed
  react: { code: string };
  swiftui: { code: string };
  tips?: string[];
}
```

### Styling

- Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Custom theme variables in `src/index.css` using `@theme` block
- Dark theme: `--color-bg-primary: #0c0c0c`, accent colors for syntax highlighting
- Code blocks use `prism-react-renderer` with a custom VS Code-inspired theme

### Adding Lessons

Add to `src/data/lessons.ts`. Categories are auto-extracted: `export const categories = [...new Set(lessons.map(l => l.category))]`

Existing categories: Fundamentals, Layout, Data Display, Navigation, Forms, State, UI, Data
