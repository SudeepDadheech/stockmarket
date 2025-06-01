import React from "react";
import Search from "./Search";
import ThemeIcon from "./ThemeIcon";

const Header = ({ name, logo }) => {
  return (
    <>
      <div className="xl:px-32">
        <h1 className="text-5xl">{name}</h1>
        <Search />
      </div>
      <div className="h-16 w-16 xl:h-32 xl:w-32 ml-2">
        {logo && (
          <img className="object-cover" src={logo} alt="company logo"></img>
        )}
      </div>
      <ThemeIcon />
    </>
  );
};

export default Header;
