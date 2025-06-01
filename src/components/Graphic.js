import React, { useState, useContext, useEffect } from "react";
import Card from "./Card";
import { chartConfig } from "../constants/config";
import ChartFilterButton from "./ChartFilterButton";
import StockContext from "../context/StockContext";
import { fetchStockHistoricalData } from "../api/stock-api";
import {
  convertDateToUnixTimestamp,
  convertUnixTimeStampToDate,
  createDate,
} from "../helpers/date-helper.js";
import Chart from "./Chart";

const Graphic = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("1W");

  const { stockSymbol } = useContext(StockContext);
  const formatData = (data) => {
    return data.c.map((item, index) => {
      return {
        value: item.toFixed(2),
        date: convertUnixTimeStampToDate(data.t[index]),
        time: new Date(data.t[index]).toLocaleTimeString("en-US"), //converts unixtimestamp to xx:xx am/pm
      };
    });
  };

  useEffect(() => {
    const getDateRange = () => {
      const { days, weeks, months, years } = chartConfig[filter];
      const endDate = new Date();

      // today's saturday, sunday, or monday so set enddate to friday
      if (
        days === 1 &&
        (endDate.getDay() === 6 ||
          endDate.getDay() === 0 ||
          endDate.getDay() === 1)
      ) {
        endDate.setDate(endDate.getDate() + (6 - new Date().getDay() - 1) - 7);
      }

      const startDate = createDate(endDate, -days, -weeks, -months, -years);
      const startTimeStampUnix = convertDateToUnixTimestamp(startDate);
      const endTimeStampUnix = convertDateToUnixTimestamp(endDate);

      return { startTimeStampUnix, endTimeStampUnix };
    };

    const updateChartData = async () => {
      try {
        const { startTimeStampUnix, endTimeStampUnix } = getDateRange();
        const resolution = chartConfig[filter].resolution;
        const result = await fetchStockHistoricalData(
          stockSymbol,
          resolution,
          startTimeStampUnix,
          endTimeStampUnix
        );
        setData(formatData(result));
        // console.log(formatData(result))
      } catch (error) {
        setData([]);
        console.log(error);
      }
    };

    updateChartData();
  }, [stockSymbol, filter]);

  return (
    <Card>
      {/* creates four filter buttons on the topright of the card */}
      <ul className="flex absolute top-2 right-2 z-40">
        {Object.keys(chartConfig).map((item) => {
          return (
            <li key={item}>
              <ChartFilterButton
                text={item}
                active={filter === item}
                onClick={() => setFilter(item)}
              />
            </li>
          );
        })}
      </ul>
      <Chart data={data} filter={filter} />
    </Card>
  );
};

export default Graphic;
