# Copilot Instructions

## Project Snapshot
- Vite + React 18 + TypeScript app driven by React Router (`src/App.tsx`) and wrapped with TanStack Query, shadcn toasts, and `TooltipProvider`.
- Styling is almost entirely Tailwind with custom tokens/animations declared in `src/index.css`; keep new design tokens in that layer.
- Path alias `@/*` (see `tsconfig.json`) is used throughout; prefer it over relative imports when touching files under `src/`.

## Core Layout Patterns
- `SidebarTab` lives in `src/components/DashboardSidebar.tsx` and powers tab labels/content for Dashboard, Lounge, and Command Room dashboards—add new tabs by extending the union, nav array, and per-page `tabMeta` lookup together.
- `Sidebar` manages lounge vs command-room theming by reading the current route; it expects parents to own `isOpen` + `activeTab` state and pass `onTabChange` handlers.
- `RightSidebar` (`src/components/RightSidebar.tsx`) is a themeable capsule with `theme` tokens (`amber`/`cyan`) and a required `sandCharmImage`; reuse it instead of recreating side panels.
- `DealCard` (`src/components/DealCard.tsx`) carries amber/cyan styling variants; pass `theme="cyan"` when rendering in the Command Room to stay on-brand.
- Pages under `src/pages/` follow the same shell: wrap content with `<Sidebar>` + `<RightSidebar>`, calculate `activeMeta` from local `tabMeta`, and delegate actual grids/cards through a `renderTabContent()` switch.

## Feature Development Tips
- Lounge (`src/pages/Lounge.tsx`) and Command Room (`src/pages/CommandRoom.tsx`) are mirrors: when adjusting one, inspect the other to keep parity (cyan vs amber palette, copy tone, layout spacing).
- Shared tab content leans on hard-coded datasets near the top of each page; update those arrays instead of sprinkling literals deep inside JSX.
- Animated radar/market visuals are pure CSS/SVG—extend them by duplicating the existing absolute-position templates to avoid breaking positioning math.
- Landing page (`src/pages/Index.tsx`) uses extensive inline gradients and entrance animations; edits should preserve the `animate-*` utility usage declared in `index.css`.

## Working Practices
- Primary scripts: `pnpm dev` (local preview), `pnpm build` (production bundle), `pnpm lint` (eslint w/ flat config). No test runner is configured.
- Tailwind class conflicts will fail lint/build; rely on `tailwind-merge` via the `cn` helper when building class strings dynamically.
- Keep Lucide icons consistent with existing imports—group them at the top and reuse the same stroke widths that the surrounding file uses.
- Assets live under `src/assets/`; reference them as modules (e.g., `import sandCharm from "@/assets/sand-charm.png"`).
- When tweaking layout spacing, prefer modifying shared utility classes (`smooth-transition`, etc.) in `index.css` rather than inline `style` unless the design already uses inline gradient strings.

## Integration Guardrails
- Any new route must be registered in `src/App.tsx` and, if it needs sidebar access, supply a dedicated page component matching the `Sidebar` contract (`isOpen`, `activeTab`).
- If you introduce data fetching, use the existing `QueryClientProvider` context; colocate hooks under `src/hooks/` and expose them via the `@/hooks/*` alias.
- For additional shadcn components, place them in `src/components/ui/` and rely on the existing pattern of exporting primitives plus TypeScript props.
- Maintain accessibility cues already present (uppercase tracking, aria attributes on sidebar buttons, alt text on imagery) when shuffling markup.
