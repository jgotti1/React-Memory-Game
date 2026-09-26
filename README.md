# 🎮 Poppy's Match Game

A fun, interactive memory matching card game built with React. Flip cards to find matching pairs while tracking your number of tries.

**Live site:** [poppy.margotticode.com](https://poppy.margotticode.com)

## 🎯 Game Overview

**Poppy's Match Game** is a classic memory game where players flip cards to reveal images and match pairs. The deck has 12 cards: 6 unique images, each appearing twice.

### How to Play
1. Click **"New Game"** to shuffle and deal the cards (the board is empty until you do)
2. Click any card to flip it and reveal the image
3. Click a second card to try to find a match
4. If the cards match, they stay flipped. If not, they flip back after 2.5 seconds
5. Continue until all pairs are matched
6. The **"Total Tries"** counter tracks how many card comparisons you've made
7. Try to match all pairs in the fewest tries!

## 🚀 Getting Started

### Prerequisites
- Node.js and npm

### Installation & Setup
```bash
# Install dependencies
npm install

# Start the development server
npm start
```
The app will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Runs the app in development mode with hot reload |
| `npm run build` | Creates an optimized production build in the `build/` folder |
| `npm test` | Launches the test runner in watch mode (there are no tests yet) |

## 🎨 Features

- **Responsive Design** — Adapts to mobile (2 columns), tablet (3 columns), and desktop (4 columns)
- **3D Card Flip Animation** — Smooth CSS transform animations for card reveals
- **Background Music** — Looping Playtime soundtrack (browsers only let it start after your first click, and there is no mute control yet)
- **Turn Counter** — Tracks the number of card pair comparisons
- **Random Shuffle** — Cards are randomized on each new game

## 📁 Project Structure

```
src/
├── App.js                 # Main game logic & state management
├── App.css                # App container & button styles
├── components/
│   ├── Header.js          # Game title, new game button, tries counter
│   ├── header.css         # Header styling
│   ├── SingleCard.js      # Individual card component
│   └── singleCard.css     # Card grid, card styling & flip animations
├── index.js               # React app entry point
└── index.css              # Global styles & background gradient

public/
├── index.html             # HTML template
├── Playtime.mp3           # Background music
└── img/                   # Card images plus cover.jpg (the card back)
```

## 🛠️ Technical Details

### Technology Stack
- **React 18** — UI framework
- **Create React App** — Build tooling (Webpack, Babel, ESLint)
- **CSS 3** — Grid layout and 3D transforms for card flip animations
- **HTML5 Audio** — Background music via a plain `<audio>` element

`howler` and `react-h5-audio-player` are listed in `package.json` but are not imported anywhere in `src/`.

### Game State Management
The `App.js` component manages:
- `cards` — Array of shuffled card objects with image src and matched status
- `turns` — Counter for completed comparisons
- `choiceOne` & `choiceTwo` — Currently selected cards being compared
- `disabled` — Flag to prevent clicks during comparison delay (2.5 seconds)

## 🎮 How the Game Works

1. **Shuffle** — `shuffleCards()` duplicates the 6 images, shuffles them randomly, and assigns unique IDs
2. **Selection** — `handleChoice()` stores the clicked card as choiceOne or choiceTwo
3. **Comparison** — When two cards are selected, a `useEffect` hook triggers:
   - Disables the board temporarily
   - Compares the card images
   - If matched: marks them as `matched: true`
   - If not matched: resets choices after 2.5 seconds
4. **Music** — The same effect calls `play()` on the hidden `<audio>` element, which is a no-op once the music is already playing

## 🎵 Audio

- **Background Music**: `public/Playtime.mp3` loops continuously once playback starts
- Audio is a hidden HTML5 `<audio>` element with the `loop` attribute; there are no on-screen controls

## 📱 Responsive Breakpoints

- **Mobile** (≤ 400px): 2-column grid
- **Tablet** (401–820px): 3-column grid
- **Desktop** (≥ 821px): 4-column grid

## 🎨 Styling & Theme

- **Color Scheme**: Deep blue-purple gradient background with white text and red text shadows
- **Font**: Raleway (from Google Fonts)
- **Button Hover**: Pink (#c23866) background on hover
- **Card Border**: White 2px borders with rounded corners

## 🚢 Deployment

Image and audio paths are absolute (`/img/...`, `/Playtime.mp3`), so the app must be served from the root of a domain, not a subfolder. It is intended to be deployed to Vercel at poppy.margotticode.com.

## 🔮 Future Improvements

- Show a message when all pairs are matched (there is no win state yet)
- Add a mute/pause control for the music
- Add difficulty levels (fewer pairs, more pairs)
- Implement local leaderboard (high scores, best times)
- Add sound effects for card flips and matches
- Add more card sets

## 🐛 Known Issues

- Leftover `console.log` calls in `App.js`
- Unused `useEffect` import in `Header.js` (shows as a build warning)
- Card IDs use `Math.random()` instead of deterministic IDs

## 📝 Development Notes

See [CLAUDE.md](./CLAUDE.md) for detailed architecture notes and development guidance.

## Portfolio card

The block below is machine-readable project info for a portfolio site (invisible on GitHub). Keep it in sync when the project, URL or tech changes. To build a card: read this JSON and use `title`, `tagline`/`description`, `thumbnail`, `tech`, and link to `liveUrl` and `repoUrl`.

<!-- portfolio-card:start
{
  "title": "Poppy's Match Game",
  "category": "game",
  "tagline": "A memory card game with 3D flip animations, a tries counter and a looping soundtrack.",
  "description": "Poppy's Match Game is a classic memory game. Click New Game to shuffle 12 face-down cards (6 image pairs), flip two at a time and find every match. Matches stay face up, mismatches flip back after a couple of seconds, and a Total Tries counter tracks how many pairs you have turned over. The card grid adapts from 2 to 4 columns depending on screen width.",
  "liveUrl": "https://poppy.margotticode.com",
  "repoUrl": "https://github.com/jgotti1/React-Memory-Game",
  "thumbnail": "https://raw.githubusercontent.com/jgotti1/React-Memory-Game/main/docs/preview.jpg",
  "tech": ["React 18", "JavaScript", "CSS3 (grid and 3D transforms)", "Create React App", "HTML5 Audio"],
  "features": [
    "12-card shuffled deck built from 6 image pairs",
    "3D CSS card flip animation",
    "Total Tries counter",
    "Looping background music",
    "Responsive grid: 2, 3 or 4 columns by screen width"
  ],
  "platforms": ["desktop", "tablet", "mobile"],
  "status": "in-progress",
  "origin": "An early boot camp project (2022), built for my grandkids at their request"
}
portfolio-card:end -->
