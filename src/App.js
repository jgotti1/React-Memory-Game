import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import Header from "./components/Header";

const cardImages = [
  { src: "/img/bear-1.jpg", matched: false },
  { src: "/img/blue-1.jpg", matched: false },
  { src: "/img/fox-1.jpg", matched: false },
  { src: "/img/girl-1.jpg", matched: false },
  { src: "/img/mommy-1.jpg", matched: false },
  { src: "/img/poppy-1.jpg", matched: false },
];
function App() {
  // mix up cards
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  const handleChoice = (card) => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 2500);
      }
    }
    let bkmusic = document.getElementById("bkmusic");
    bkmusic.play();
  }, [choiceOne, choiceTwo]);
  console.log(cards);
  return (
    <div className="App">
      <audio id="bkmusic" src="/Playtime.mp3" loop="loop" hidden="hidden"></audio>
      <Header turns={turns} shuffleCards={shuffleCards} />
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard card={card} key={card.id} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />
        ))}
      </div>
    </div>
  );
}

export default App;
