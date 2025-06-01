import "chart.js/auto";

import { Chart as ChartJS } from "react-chartjs-2";
import DarkModeContext from "../context/DarkModeContext";
import React, { useContext } from "react";

const Chart = ({ data, filter }) => {
  const { darkMode } = useContext(DarkModeContext);
  const chartData = {
    labels: data.map((obj) => obj.date),
    datasets: [
      {
        data: data.map((obj) => obj.value),
        fill: true,
        backgroundColor: darkMode ? "cyan" : "rgb(199,210,254)",
        pointBorderColor: "",
        pointBackgroundColor: "clear",
        pointBorderWidth: 0.1,
        hoverBorderWidth: 10,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "",
        pointRadius: 0,
        tension: 0.4,
        spanGaps: true,
      },
    ],
  };

  const options = {
    responsive: true,
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: "#FAFAFA",
      borderColor: "lightgreen",
      borderWidth: 1,
      titleFontColor: "black",
      titleFontStyle: "normal",
      displayColors: false,
      bodyFontColor: "black",
    },
    plugins: { legend: false },
    scales: {
      y: {
        ticks: {
          color: darkMode ? "white" : "black",
          font: {
            size: 16,
          },
        },
        grid: {
          color: "gray",
        },
      },
      x: {
        ticks: {
          color: darkMode ? "white" : "black",
          font: {
            size: 16,
          },
          maxTicksLimit: filter === "1D" ? 12 : 24,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="min-h-full max-h-full min-w-full max-w-full pt-5">
      <ChartJS
        className="min-h-6/7 max-h-full min-w-6/7 max-w-full pt-5 mt-4"
        type="line"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default Chart;
