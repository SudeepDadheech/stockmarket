import React, { useContext } from "react";
import { MdOutlineNightlightRound } from "react-icons/md";
import DarkModeContext from "../context/DarkModeContext";

const ThemeIcon = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      className={`p-3 border-2 rounded-lg absolute right-8 xl:right-32 shadow-lg ${
        darkMode
          ? "bg-gray-800 border-neutral-200"
          : "bg-neutral-200 border-gray-800"
      }`}
      onClick={toggleDarkMode}
    >
      <MdOutlineNightlightRound
        className={`h-12 w-12 cursor-pointer ${
          darkMode ? "bg-gray-800 fill-white" : "bg-neutral-200 fill-black"
        }`}
      />
    </button>
  );
};

export default ThemeIcon;
