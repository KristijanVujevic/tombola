// BingoGame.js
import React, { useState } from "react";
import "../BingoGame.css"; // Import your BingoGame specific CSS file
import RolledNumberDisplay from "./RolledNumberDisplay";
import Tema from "./Tema";

const BingoGame = () => {
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);

  const callNumber = () => {
    const newNumber = getRandomNumber();
    setCalledNumbers((prevNumbers) => [...prevNumbers, newNumber]);
    setCurrentNumber(newNumber);
  };

  const resetGame = () => {
    setCalledNumbers([]);
    setCurrentNumber(null);
  };

  const getRandomNumber = () => {
    const availableNumbers = Array.from(
      { length: 99 },
      (_, index) => index + 1
    ).filter((number) => !calledNumbers.includes(number));
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Tombola</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Tema />
          <div className="number-board">
            {Array.from({ length: 10 }, (_, rowIndex) => (
              <div key={rowIndex} className="row">
                {Array.from({ length: 9 }, (_, columnIndex) => {
                  const number = rowIndex * 10 + columnIndex + 1;
                  const isRolled = currentNumber === number;

                  return (
                    <div
                      key={number}
                      className={`number-cell ${
                        calledNumbers.includes(number) ? "called" : ""
                      } ${isRolled ? "rolled" : ""}`}
                    >
                      {number}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {currentNumber && (
            <RolledNumberDisplay rolledNumber={currentNumber} />
          )}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <button
            className="btn btn-primary mr-2"
            onClick={callNumber}
            disabled={calledNumbers.length === 99}
          >
            Call Number
          </button>
          <button className="btn btn-danger" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default BingoGame;
