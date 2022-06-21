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
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        resetTurn();
      } else {
        resetTurn();
      }
    }
    let bkmusic = document.getElementById("bkmusic");
    bkmusic.play();
  }, [choiceOne, choiceTwo]);

  return (
    <div className="App">
      <audio id="bkmusic" src="/Playtime.mp3" loop="loop" hidden="hidden"></audio>
      <Header turns={turns} shuffleCards={shuffleCards} />
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard card={card} key={card.id} handleChoice={handleChoice} />
        ))}
      </div>
    </div>
  );
}

export default App;
