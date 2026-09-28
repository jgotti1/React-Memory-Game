# Project guide

## Commands

- `npm run dev` — Vite development server, normally at `http://localhost:5173`
- `npm run build` — production build in `dist/`
- `npm run preview` — locally serve the production build
- `npm test` — run the Vitest suite once

Run both tests and the production build before pushing changes.

## Architecture

This is a React 18 application built with Vite and plain JavaScript.

- `src/App.jsx` owns game state, comparison timing, the elapsed timer, music, persistence, and the win state.
- `src/game.js` contains pure deck, Fisher–Yates shuffle, time-formatting, and score-comparison helpers.
- `src/components/Header.jsx` renders the game introduction, statistics, and controls.
- `src/components/SingleCard.jsx` renders each card as a semantic button.
- Component behavior is covered in `src/App.test.jsx`; pure game rules are covered in `src/game.test.js`.

## Game behavior

The app creates a shuffled twelve-card deck on initial render. The timer starts with the first selection. Once two distinct cards have been chosen, the board locks, the turn count increments, and the pair is evaluated. Matches reset after 450 ms and mismatches after 950 ms. Every matched card remains face up.

Completing the board opens a win summary. The best score is stored under `poppy-match-best-score` in local storage and is ranked by turns, then time. Music is off initially and only starts after the player activates the control.

## Assets and deployment

Runtime image and audio URLs are served from `public/`. Referenced card images use WebP. The app is deployed at https://poppy.margotticode.com through the linked Vercel project.

The hidden `portfolio-card` JSON block at the end of `README.md` is consumed by a separate portfolio site. Keep its features, technology, and URLs synchronized with the game.
