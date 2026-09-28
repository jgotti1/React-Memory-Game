import "./singleCard.css";

function SingleCard({ card, cardNumber, onChoose, flipped, disabled }) {
  const cardState = card.matched ? `${card.label}, matched` : flipped ? `${card.label}, face up` : "face down";

  return (
    <button
      className={`memory-card${flipped ? " memory-card--flipped" : ""}${card.matched ? " memory-card--matched" : ""}`}
      type="button"
      onClick={() => onChoose(card)}
      disabled={disabled || card.matched || flipped}
      aria-label={`Card ${cardNumber}, ${cardState}`}
      data-card-key={card.key}
    >
      <span className="memory-card__inner" aria-hidden="true">
        <span className="memory-card__face memory-card__front">
          <img src={card.src} alt="" draggable="false" />
          {card.matched && <span className="memory-card__match-mark">✓</span>}
        </span>
        <span className="memory-card__face memory-card__back">
          <img src="/img/cover.webp" alt="" draggable="false" />
        </span>
      </span>
    </button>
  );
}

export default SingleCard;
