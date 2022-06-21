// import React, { useState } from "react";
import "./singleCard.css";
function SingleCard({ card, handleChoice }) {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div className="card">
      <div>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="/img/cover.jpg" onClick={handleClick} alt="card back" />
      </div>
    </div>
  );
}

export default SingleCard;
