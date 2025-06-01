import { useState } from "react";
import "./App.css";
import StockContext from "./context/StockContext";
import DarkModeContext from "./context/DarkModeContext";
import Dashboard from "./components/Dashboard";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [stockSymbol, setStockSymbol] = useState("GOOG");
  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
        <Dashboard />
      </StockContext.Provider>
    </DarkModeContext.Provider>
  );
}

export default App;
