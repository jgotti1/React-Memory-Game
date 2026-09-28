import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import SingleCard from "./components/SingleCard";
import { createDeck, formatTime, isBetterScore } from "./game";
import "./App.css";

const BEST_SCORE_KEY = "poppy-match-best-score";

function readBestScore() {
  try {
    const savedScore = window.localStorage.getItem(BEST_SCORE_KEY);
    return savedScore ? JSON.parse(savedScore) : null;
  } catch {
    return null;
  }
}

function App() {
  const [cards, setCards] = useState(createDeck);
  const [firstChoiceId, setFirstChoiceId] = useState(null);
  const [secondChoiceId, setSecondChoiceId] = useState(null);
  const [turns, setTurns] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState("ready");
  const [feedback, setFeedback] = useState("Choose a card to begin.");
  const [bestScore, setBestScore] = useState(readBestScore);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioRef = useRef(null);

  const boardLocked = Boolean(secondChoiceId) || status === "won";

  const startNewGame = () => {
    setCards(createDeck());
    setFirstChoiceId(null);
    setSecondChoiceId(null);
    setTurns(0);
    setSeconds(0);
    setStatus("ready");
    setFeedback("New board ready. Choose a card to begin.");
  };

  const handleChoice = (card) => {
    if (boardLocked || card.matched || card.id === firstChoiceId) return;

    if (status === "ready") setStatus("playing");

    if (!firstChoiceId) {
      setFirstChoiceId(card.id);
      setFeedback(`${card.label} revealed. Choose another card.`);
    } else {
      setSecondChoiceId(card.id);
    }
  };

  useEffect(() => {
    if (status !== "playing") return undefined;

    const timer = window.setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (!firstChoiceId || !secondChoiceId) return undefined;

    const firstCard = cards.find((card) => card.id === firstChoiceId);
    const secondCard = cards.find((card) => card.id === secondChoiceId);
    const cardsMatch = firstCard.key === secondCard.key;

    setTurns((currentTurns) => currentTurns + 1);

    if (cardsMatch) {
      setCards((currentCards) => currentCards.map((card) => (
        card.key === firstCard.key ? { ...card, matched: true } : card
      )));
      setFeedback(`Match found: ${firstCard.label}.`);
    } else {
      setFeedback("Not a match. Try again.");
    }

    const resetTimer = window.setTimeout(() => {
      setFirstChoiceId(null);
      setSecondChoiceId(null);
    }, cardsMatch ? 450 : 950);

    return () => window.clearTimeout(resetTimer);
  }, [firstChoiceId, secondChoiceId]);

  useEffect(() => {
    if (status !== "playing" || cards.some((card) => !card.matched)) return;

    setStatus("won");
    setFeedback(`You won in ${turns} tries and ${formatTime(seconds)}.`);

    const completedScore = { turns, seconds };
    if (isBetterScore(completedScore, bestScore)) {
      setBestScore(completedScore);
      try {
        window.localStorage.setItem(BEST_SCORE_KEY, JSON.stringify(completedScore));
      } catch {
        // The game still works if private browsing blocks local storage.
      }
    }
  }, [bestScore, cards, seconds, status, turns]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicEnabled) {
      audio.play().catch(() => setMusicEnabled(false));
    } else {
      audio.pause();
    }
  }, [musicEnabled]);

  return (
    <main className="app-shell">
      <audio ref={audioRef} src="/Playtime.mp3" loop preload="none" />

      <Header
        turns={turns}
        seconds={seconds}
        bestScore={bestScore}
        musicEnabled={musicEnabled}
        onMusicToggle={() => setMusicEnabled((enabled) => !enabled)}
        onNewGame={startNewGame}
        inactive={status === "won"}
      />

      <p className="sr-only" aria-live="polite">{feedback}</p>

      <section
        className="game-board"
        aria-label="Memory card board"
        aria-hidden={status === "won" || undefined}
        inert={status === "won" ? "" : undefined}
      >
        {cards.map((card, index) => (
          <SingleCard
            card={card}
            cardNumber={index + 1}
            key={card.id}
            onChoose={handleChoice}
            flipped={card.id === firstChoiceId || card.id === secondChoiceId || card.matched}
            disabled={boardLocked}
          />
        ))}
      </section>

      {status === "won" && (
        <div className="win-backdrop">
          <section className="win-panel" role="dialog" aria-modal="true" aria-labelledby="win-title">
            <span className="win-panel__sparkle" aria-hidden="true">✦</span>
            <p className="win-panel__eyebrow">Board complete</p>
            <h2 id="win-title">You found every match!</h2>
            <p>
              Finished in <strong>{turns} tries</strong> and <strong>{formatTime(seconds)}</strong>.
            </p>
            <button className="primary-button" type="button" onClick={startNewGame} autoFocus>
              Play again
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
