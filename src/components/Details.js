import React, { useContext } from "react";
import DarkModeContext from "../context/DarkModeContext";
import Card from "./Card";

const Details = ({ details }) => {
  const { darkMode } = useContext(DarkModeContext);

  const stockDetailsList = {
    name: "Name",
    exchange: "Exchange",
    finnhubIndustry: "Industry",
    marketCapitalization: "Market Capitalization",
    currency: "Currency",
    country: "Country",
    ipo: "IPO Date",
  };

  const convertMilToBil = (num) => {
    return (num / 1000).toFixed(2);
  };

  return (
    <Card>
      <ul
        className={`h-full w-full flex flex-col justify-between divide-y-1 ${
          darkMode ? "divide-gray-800" : null
        }`}
      >
        {Object.keys(stockDetailsList).map((item) => {
          return (
            <li key={item} className="flex flex-1 justify-between items-center">
              <span>{stockDetailsList[item]}</span>
              <span>
                {item === "marketCapitalization"
                  ? `${convertMilToBil(details[item])}B`
                  : details[item]}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Details;
