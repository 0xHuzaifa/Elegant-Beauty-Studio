# Project: Booking App — AI coding instructions

This file contains concise, actionable guidance for AI coding agents working in this repository. Focus on concrete, discoverable patterns and where to make changes.

1. Purpose & architecture

- **What:** Single-page React app built with Vite + TypeScript + React Router + shadcn-ui components.
- **Entry points:** App bootstrap is `src/main.tsx` -> renders `src/App.tsx`.
- **Routing:** `src/App.tsx` contains the `BrowserRouter` and `Routes` (see `Index` and `NotFound` in `src/pages/`). Add new routes inside the existing `<Routes>` block; keep the `*` catch-all route at the bottom.
- **State & data:** Server/state interactions use `@tanstack/react-query` (`QueryClient` created in `src/App.tsx`). Local booking logic lives in `src/hooks/useBooking.ts` and types in `src/types/booking.ts`.

2. Key directories and examples

- `src/components/booking/`: booking feature UI split into small presentational components (e.g. `BookingCalendar.tsx`, `TimeSlotSelector.tsx`, `CustomerDetails.tsx`). Follow this component-per-file pattern.
- `src/components/ui/`: shared UI primitives (shadcn-derived). Reuse existing components like `button.tsx`, `input.tsx`, `toast.tsx` rather than adding new primitive markup.
- `src/lib/`: place small app-wide utilities here (example added: `ScrollToTop.tsx`).
- `src/utils/timeSlots.ts`: time-slot logic helper — prefer reusing these helpers for consistent behavior.

3. Coding/conventions specific to this repo

- Prefer functional React components with TypeScript. Files use `.tsx` and named default exports (e.g. `export default function X(){}`).
- Tailwind is used for styling; utility classes appear in JSX. Keep styles inline in components; there is no global CSS theme file beyond `index.css`.
- Routes are defined in `src/App.tsx`; update that file when adding pages. The catch-all `*` route must remain last.
- Notifications: there are two toast systems present — `Toaster` from `src/components/ui/toaster` and `Sonner` from `src/components/ui/sonner`. Use existing wrappers for consistent UX.

4. Dev workflows & commands

- Install & run (local dev): `npm i` then `npm run dev` (Vite dev server).
- Build: `npm run build`; preview: `npm run preview`.
- Lint: `npm run lint` (ESLint configured).

5. Integration points / external deps

- Routing: `react-router-dom@6` — use `useLocation`, `useNavigate`, and `<Routes>/<Route>`.
- Data fetching: `@tanstack/react-query` (client is created in `src/App.tsx`). Use `useQuery`/`useMutation` throughout.
- Date/time: `date-fns` and `react-day-picker` for calendar UI.

6. Examples of common edits

- Add a new page: create `src/pages/MyPage.tsx`, export default component, then add a `<Route path="/mypage" element={<MyPage/>} />` into `src/App.tsx` above the `*` route.
- Global behavior on route change (example): There's a small `ScrollToTop` utility added at `src/lib/ScrollToTop.tsx` and mounted in `src/App.tsx` just inside `<BrowserRouter>`. It uses `useLocation()` and `window.scrollTo({ top: 0, behavior: 'smooth' })` to scroll smoothly on navigation.

7. Testing & verification guidance for changes

- After making UI or type changes, run `npm run dev` to visually confirm behavior. For quick type-checking, `npm run build` will surface TS errors via Vite.

8. What to avoid / gotchas

- Do not move or remove the `QueryClientProvider` or `TooltipProvider` wrappers in `src/App.tsx` — many components expect these contexts.
- Keep route ordering: custom routes must be declared before the `*` catch-all.
- There are two toast systems — be intentional which one you use to avoid double notifications.

9. If you need more context

- Inspect `src/components/booking/` and `src/components/ui/` for examples of patterns to follow.
- Use the dev server to verify UI changes quickly: `npm run dev`.

If any of the above is unclear or you'd like more examples (unit tests, new route scaffold, or a page template), tell me which part to expand.
