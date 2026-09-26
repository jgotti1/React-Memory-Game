# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — dev server at http://localhost:3000 with hot reload
- `npm run build` — production build into `build/` (gitignored)
- `npm test` — Jest via react-scripts, watch mode. Run once with `npm test -- --watchAll=false`, or a single file with `npm test -- --watchAll=false SingleCard`. There are currently no test files.

No lint script; ESLint runs through Create React App (`react-app` config) during `start` and `build`.

## Architecture

Create React App (React 18, plain JS, one CSS file per component). All game state lives in [src/App.js](src/App.js); [Header](src/components/Header.js) and [SingleCard](src/components/SingleCard.js) are presentational and only receive props/callbacks.

State in `App`: `cards`, `turns`, `choiceOne`, `choiceTwo`, `disabled`.

Game flow:
1. `cards` starts empty. Nothing is dealt until the user clicks **New Game**, which calls `shuffleCards()`: it doubles the 6-entry `cardImages` array, sorts by `Math.random()`, gives each card a `Math.random()` id, and resets choices and turns.
2. Clicking a card's back calls `handleChoice`, which fills `choiceOne` then `choiceTwo`. `SingleCard` ignores clicks while `disabled`.
3. A `useEffect` on `[choiceOne, choiceTwo]` compares the two `src` values. A match flags every card with that `src` as `matched: true` and resets the turn immediately. A mismatch keeps the board `disabled` and calls `resetTurn` after a 2500 ms `setTimeout`. `resetTurn` clears both choices and increments `turns`.
4. A card renders flipped when it is `choiceOne`, `choiceTwo` (compared by object reference) or `matched`. The flip is pure CSS: `.flipped` rotates the `.front` and `.back` images in [singleCard.css](src/components/singleCard.css).

Things that are easy to get wrong:
- The `.card-grid` responsive layout (2 / 3 / 4 columns at ≤400px / 401-820px / ≥821px) is in `singleCard.css`, not `App.css`.
- Image and audio URLs are absolute (`/img/...`, `/Playtime.mp3`), so the app only works when served from a domain root, not a subpath. Card faces and `cover.jpg` (the card back) are in `public/img/`; not every file there is referenced by `cardImages`.
- Music is a hidden `<audio id="bkmusic" loop>` in `App`. The same effect that compares cards also calls `bkmusic.play()` on mount and after every choice change. Repeated `play()` calls on a playing element are harmless, and browsers block autoplay until the first click, so music effectively starts on the first card click. There is no mute or pause control.
- `howler` and `react-h5-audio-player` are in `package.json` but are not imported anywhere in `src/`.
- Leftover `console.log` calls in `App.js`.
- There is no win detection.

## Deployment

Deployed on Vercel (project `react-memory-game`, team `john`) at https://poppy.margotticode.com, also reachable at react-memory-game-pearl.vercel.app. The project is linked to the GitHub repo, so every push to `main` redeploys. DNS for margotticode.com is at Bluehost (`ns1`/`ns2.bluehost.com`); `poppy` is an A record to `76.76.21.21` (Vercel's older IP, which Vercel says keeps working). Bluehost was slow to publish new records, so allow time after DNS edits. No `homepage` field or Vercel config exists in the repo. Vercel builds with `CI=true`, and Create React App then treats any ESLint warning (for example an unused import) as a build error, so check with `CI=true npm run build` before pushing.

## Portfolio card

`README.md` ends with a hidden JSON block (between `portfolio-card:start` and `portfolio-card:end` inside an HTML comment) that a portfolio site reads. Keep it in sync when features, tech, URLs or status change, and keep it valid JSON with no `--` sequences. `docs/preview.jpg` is its thumbnail: a 1984x1240 capture of live gameplay after clicking New Game (two pairs matched, one card mid-turn), not the start screen. Re-running `/portfolio-card` would replace it with a start-screen capture, so regenerate it the same way if it needs updating. `status` is `live` and `tech` includes Vercel.
