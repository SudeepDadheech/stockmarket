import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Details from "./Details";
import Overview from "./Overview";
import Graphic from "./Graphic";
import DarkModeContext from "../context/DarkModeContext";
import StockContext from "../context/StockContext";
import { fetchStockQuote, fetchStockDetails } from "../api/stock-api";

const Dashboard = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { stockSymbol } = useContext(StockContext);
  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchStockQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };

    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);

  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand  ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100"
      }`}
    >
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header name={stockDetails.name} logo={stockDetails.logo} />
      </div>
      <div className="md:col-span-2 row-span-4">
        <Graphic />
      </div>
      <div>
        <Overview
          symbol={stockDetails.ticker}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stockDetails.currency}
        />
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Details details={stockDetails} />
      </div>
      <footer className="absolute inset-x-0 bottom-0 h-8 text-center">
      </footer>
    </div>
  );
};

export default Dashboard;
