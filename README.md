# Poppy's Match Game

A polished memory matching game built with React and Vite. Find all six pairs, race the clock, and try to finish in fewer turns than your saved best score.

**Live site:** [poppy.margotticode.com](https://poppy.margotticode.com)

## Features

- Twelve-card board dealt automatically on page load
- Smooth, responsive 3D card flips
- Turn counter and elapsed game timer
- Win summary with one-click replay
- Best score saved in the browser
- Opt-in background music with a persistent on-screen control
- Keyboard-operable cards and accessible game feedback
- Responsive 3-column mobile and 4-column desktop layouts
- Reduced-motion support
- Optimized WebP card images

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Vite prints the local development URL, normally [http://localhost:5173](http://localhost:5173).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm start` | Alias for the Vite development server |
| `npm run build` | Create an optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the Vitest test suite once |

## Project structure

```text
src/
├── App.jsx                  # Game orchestration, timing, audio, and win state
├── game.js                  # Deck, shuffle, time, and score helpers
├── components/
│   ├── Header.jsx           # Title, statistics, and game controls
│   └── SingleCard.jsx       # Accessible card button and card faces
├── App.test.jsx             # End-to-end component behavior tests
├── game.test.js             # Game helper unit tests
├── main.jsx                 # React entry point
└── setupTests.js            # Browser API mocks and jest-dom matchers
```

## Game rules

1. Choose any face-down card to start the timer.
2. Choose a second card to look for a matching image.
3. A match stays face up; a mismatch turns back over after a short pause.
4. Match every pair to finish the game.
5. Scores are ranked by fewest turns, with elapsed time used as a tie-breaker.

## Technology

- React 18
- Vite
- Vitest and Testing Library
- Modern CSS Grid and 3D transforms
- HTML5 Audio and local storage
- Vercel

## Quality checks

Before opening a pull request or pushing to `main`, run:

```bash
npm test
npm run build
```

The test suite covers initial dealing, comparisons, duplicate-card protection, game reset, music opt-in, the win flow, shuffling, time formatting, and best-score ranking.

## Deployment

The Vercel project is linked to this repository. Pushing `main` creates a new production deployment for [poppy.margotticode.com](https://poppy.margotticode.com). Static images and audio are served from `public/`, and the optimized application bundle is generated in the ignored `dist/` directory.

## Portfolio card

The block below is machine-readable project information for the portfolio site. Keep it synchronized with the game, URLs, and preview image.

<!-- portfolio-card:start
{
  "title": "Poppy's Match Game",
  "category": "game",
  "tagline": "A polished memory challenge with animated cards, timed play, and a saved best score.",
  "description": "Poppy's Match Game is a responsive memory challenge built with React and Vite. The twelve-card board is ready immediately, accessible card controls work with a mouse, touch, or keyboard, and each run tracks turns and elapsed time. A win summary makes replaying easy, while the browser saves the player's best result.",
  "liveUrl": "https://poppy.margotticode.com",
  "repoUrl": "https://github.com/jgotti1/React-Memory-Game",
  "thumbnail": "https://raw.githubusercontent.com/jgotti1/React-Memory-Game/main/docs/preview.jpg",
  "tech": ["React 18", "JavaScript", "Vite", "Vitest", "CSS Grid", "HTML5 Audio", "Vercel"],
  "features": [
    "Automatically dealt twelve-card board with an unbiased shuffle",
    "Accessible keyboard controls and live game feedback",
    "Animated 3D card flips with reduced-motion support",
    "Turn counter, timer, win summary, and locally saved best score",
    "Opt-in background music and responsive mobile layout"
  ],
  "platforms": ["desktop", "tablet", "mobile"],
  "status": "live",
  "origin": "An early boot camp project (2022), built for my grandkids at their request"
}
portfolio-card:end -->
