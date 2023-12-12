import React, { useState, useEffect } from "react";
import "../BingoGame.css"; // Import your BingoGame specific CSS file
import RolledNumberDisplay from "./RolledNumberDisplay";
import Tema from "./Tema";
import { Icon } from "@iconify/react";

const BingoGame = () => {
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Ask for the user's name when the component mounts
    const name = window.prompt("Unesite ime:");
    setUserName(name || ""); // Set to "Guest" if the user cancels or enters an empty name
  }, []); // Run this effect only once when the component mounts

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
      { length: 90 },
      (_, index) => index + 1
    ).filter((number) => !calledNumbers.includes(number));
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">
        Tombola{userName && <span> {userName}</span>}
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Tema />
          <div className="number-board">
            {Array.from({ length: 9 }, (_, rowIndex) => (
              <div key={rowIndex} className="row">
                {Array.from({ length: 10 }, (_, columnIndex) => {
                  const number = rowIndex * 10 + columnIndex + 1; // Corrected calculation
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
            <Icon
              icon="octicon:number-16"
              color="blue"
              width="32"
              height="32"
            />
          </button>
          <button
            className="btn btn-danger"
            onClick={resetGame}
            style={{ marginLeft: "200px" }}
          >
            <Icon
              icon="system-uicons:reset-hard"
              color="black"
              width="32"
              height="32"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BingoGame;
