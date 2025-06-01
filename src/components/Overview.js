import React from "react";
import Card from "./Card";

const Overview = ({ change, changePercent, currency, price, symbol }) => {
  return (
    <Card>
      <span className="font-bold text-neutral-400 absolute top-4 left-4 text-lg xl:text-xl 2xl:text-2xl">
        {symbol}
      </span>
      <div className="h-full w-full flex items-center justify-around">
        <span className="font-bold text-2xl xl:text-3xl 2xl:text-4xl flex items-center">
          ${price}
          <span className="font-bold text-neutral-400 m-2 text-lg xl:text-xl 2xl:text-2xl">
            {currency}
          </span>
        </span>
        <span
          className={`font-bold	text-lg xl:text-xl 2xl:text-2xl	${
            change > 0 ? "text-lime-500" : "text-red-500"
          }`}
        >
          {(change = change > 0 ? `+${change}` : change)}{" "}
          <span>({changePercent}%)</span>
        </span>
      </div>
    </Card>
  );
};

export default Overview;
