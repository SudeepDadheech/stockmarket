import React, { useState, useContext } from "react";
import { MdClose, MdSearch } from "react-icons/md";
import SearchResults from "./SearchResults";
import DarkModeContext from "../context/DarkModeContext";
import { fetchStockSymbol } from "../api/stock-api";

const Search = () => {
  const { darkMode } = useContext(DarkModeContext);

  const [input, setInput] = useState(""); // tracks user's query of stock in search bar
  const [bestMatches, setBestMatches] = useState([]); //stocks returned from api that are similar to input

  const clear = () => {
    setInput("");
    setBestMatches([]);
  };

  const updateBestMatches = async () => {
    try {
      if (input) {
        const apiSearchResults = await fetchStockSymbol(input);
        const result = apiSearchResults.result;
        setBestMatches(result);
      }
    } catch (error) {
      setBestMatches([]);
      console.log(error);
    }
  };

  return (
    <div
      className={`my-4 border-2 rounded-md flex items-center relative z-50 w-96  ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"
      }`}
    >
      <input
        type="text"
        value={input}
        className={`w-full px-4 py-4 focus:outline-none rounded-md ${
          darkMode ? "bg-gray-900" : null
        }`}
        placeholder="Search for a stock..."
        onChange={(event) => setInput(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            updateBestMatches();
          }
        }}
      />

      {input && (
        <button onClick={clear} className="m-0.5">
          <MdClose className="h-6 w-6 fill-gray-500" />
        </button>
      )}

      <button
        onClick={updateBestMatches}
        className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-2 p-2"
      >
        <MdSearch className="fill-white" />
      </button>

      {input && bestMatches.length > 0 ? (
        <SearchResults input={input} results={bestMatches} />
      ) : null}
    </div>
  );
};

export default Search;
