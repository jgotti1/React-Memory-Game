import { useEffect } from "react";
import "./header.css";

const Header = (props) => {
  return (
    <div className="heading">
      <h1>Poppy's Match Game</h1>
      <button onClick={props.shuffleCards}>New Game</button>
      <h4 className="turns">Total Tries: {props.turns}</h4>
    </div>
  );
};

export default Header;
