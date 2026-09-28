import { formatTime } from "../game";
import "./header.css";

function Header({
  turns,
  seconds,
  bestScore,
  musicEnabled,
  onMusicToggle,
  onNewGame,
  inactive,
}) {
  return (
    <header
      className="game-header"
      aria-hidden={inactive || undefined}
      inert={inactive ? "" : undefined}
    >
      <div className="game-header__intro">
        <p className="game-header__eyebrow">A memory challenge</p>
        <h1>Poppy&apos;s Match Game</h1>
        <p>Find all six pairs and beat your best score.</p>
      </div>

      <div className="scoreboard" aria-label="Game statistics">
        <div className="scoreboard__item">
          <span>Tries</span>
          <strong>{turns}</strong>
        </div>
        <div className="scoreboard__item">
          <span>Time</span>
          <strong>{formatTime(seconds)}</strong>
        </div>
        <div className="scoreboard__item scoreboard__item--best">
          <span>Best</span>
          <strong>
            {bestScore ? `${bestScore.turns} / ${formatTime(bestScore.seconds)}` : "—"}
          </strong>
        </div>
      </div>

      <div className="game-header__actions">
        <button className="secondary-button" type="button" onClick={onMusicToggle} aria-pressed={musicEnabled}>
          <span aria-hidden="true">{musicEnabled ? "♫" : "♪"}</span>
          {musicEnabled ? "Music on" : "Music off"}
        </button>
        <button className="primary-button" type="button" onClick={onNewGame}>
          New game
        </button>
      </div>
    </header>
  );
}

export default Header;
