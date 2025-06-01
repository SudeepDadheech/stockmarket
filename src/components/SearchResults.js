import React, { useContext } from "react";
import StockContext from "../context/StockContext";
import DarkModeContext from "../context/DarkModeContext";

const SearchResults = ({ input, results }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { setStockSymbol } = useContext(StockContext);

  //sorts symbols alphabetically
  const sortObj = (x, y) => {
    return x.displaySymbol.localeCompare(y.displaySymbol);
  };

  //removes stocks that have a period in their ticker
  let organizedResults = results
    .sort(sortObj)
    .filter((item) => item.displaySymbol.includes(".") === false);

  //found index of stock symbol === input in search results
  const foundIndex = organizedResults.findIndex(
    (x) => x.displaySymbol === input.toUpperCase()
  );

  //moves element to beginning of array
  if (foundIndex > -1) {
    const foundData = organizedResults[foundIndex];
    organizedResults = organizedResults.filter(
      (item) => item.displaySymbol !== input.toUpperCase()
    );
    organizedResults.unshift(foundData);
  }

  return (
    <ul
      className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll ${
        darkMode
          ? "bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark"
          : "bg-white border-neutral-200 custom-scrollbar"
      }`}
    >
      {organizedResults.map((item) => {
        return (
          <li
            key={item.symbol}
            className={`cursor-pointer p-4 m-2 flex items-center justify-between rounded-md ${
              darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200"
            }`}
            onClick={() => {
              setStockSymbol(item.symbol);
            }}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
