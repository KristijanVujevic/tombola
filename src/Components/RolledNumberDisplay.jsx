// RolledNumberDisplay.js
import React, { useState, useEffect } from "react";
import "../RolledNumberDisplay.css";
import { Theme } from "../App";

const RolledNumberDisplay = ({ rolledNumber }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { theme } = Theme;

  useEffect(() => {
    setIsVisible(true);

    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => clearTimeout(timeoutId);
  }, [rolledNumber]);

  return isVisible ? (
    <div
      className={`rolled-number-display ${
        theme === "dark" ? "dark-theme" : "light"
      }`}
      onAnimationEnd={() => setIsVisible(false)}
    >
      <p>{rolledNumber}</p>
    </div>
  ) : null;
};

export default RolledNumberDisplay;
