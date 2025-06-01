import React from "react";

const ChartFilterButton = ({ text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`h-8 w-12 m-2 border-1 rounded-md flex items-center justify-center cursor-pointer ${
        active
          ? "bg-indigo-600 border-blue-700 text-gray-100"
          : "bg-gray-300 border-gray-300 text-black"
      }`}
    >
      {text}
    </button>
  );
};

export default ChartFilterButton;
