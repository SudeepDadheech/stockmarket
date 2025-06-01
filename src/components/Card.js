import React, { useContext } from "react";
import DarkModeContext from "../context/DarkModeContext";

const Card = ({ children }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={` h-full w-full rounded-md border-2 relative p-8  ${
        darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-neutral-200"
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
