// App.js
import React, { useState, createContext } from "react";
import "./App.css";
import "./RolledNumberDisplay.css";

import BingoGame from "./Components/BingoGame";

export const Theme = createContext("light");

const App = () => {
  const [theme, setTheme] = useState("dark");
  return (
    <Theme.Provider value={[theme, setTheme]}>
      <div className={`${theme} App`}>
        <BingoGame />
      </div>
    </Theme.Provider>
  );
};

export default App;
