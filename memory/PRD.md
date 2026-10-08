# PRD – L’Antica Sicilia Webseite

## Original problem statement
"Importiere dieses GitHub-Repo und mach es startklar: https://github.com/nyarkoluis-png/l-scicilia-restaurant und lösche das video der speisekarte auf der webseite und füge die preise der speisekarte aud sem video hinzu, mache die webseite noch interressanter und mehr nach italien flaggen farben"

User choices: Flaggenfarben als deutliche Akzente auf hellem Hintergrund; mehr Animationen, schönere Bilder, ansprechendere Speisekarte; Gerichte & Preise genau wie im Video.

## Architecture
- /app/frontend = imported Lovable project (TanStack Start + React 19 + Vite 8 + Tailwind v4), started via `yarn start` (vite dev, port 3000). Installed with `--ignore-engines` (Node 20 vs. required 22).
- framer-motion (reveals, parallax, 3D tilt), lenis (smooth scroll). No backend needed.
- Menu data: src/lib/menu.ts (91 items, 9 categories, transcribed from the original menu video).

## Implemented (2026-10-08)
- Repo imported & running; menu video + asset removed
- Full menu with prices: Pizza 1–25 + Familien-Pizza (auf Anfrage), Pizza Bianche, Nudelgerichte, Al Forno, Fleisch, Fisch, Salate, Dolci, Getränke
- Redesign: Tricolore palette (Verde/Bianco/Rosso), Bodoni Moda + Instrument Sans, Etna logo mark + SVG favicon, masked hero reveal, arch hero image with parallax + 3D tilt, rotating rating badge, slow marquee, bento, story parallax, reviews, green visit section
- Speisekarte: sticky category chips + search, numbered pizzas, dotted price leaders, order CTA
- Images compressed (~200 KB each)

## Backlog
- P1: Allergen/Zusatzstoff-Kennzeichnung (not in video)
- P1: Real Instagram link, exact Uber Eats/Lieferando store links
- P2: Gallery, Google Maps embed, English version
