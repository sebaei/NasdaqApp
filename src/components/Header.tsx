import React from "react";
import "../styles/Header.scss";
import NasdaqLogo from "../assets/nasdaq-logo-dark.webp";
import SearchIcon from "../assets/SearchIcon";

type HeaderProps = {
  onSearch: (value: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const Header: React.FC<HeaderProps> = ({
  onSearch,
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <header className={`explore-header ${darkMode ? "dark" : ""}`}>
      <img src={NasdaqLogo} alt="Nasdaq Logo" className="logo" />
      <div className="search-container">
        <SearchIcon />
        <label htmlFor="search-input" className="hidden">
          Search by Ticker
        </label>
        <input
          type="text"
          placeholder="Search by Ticker..."
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
        />
      </div>
      <button className="toggle-btn" onClick={toggleDarkMode}>
        {darkMode ? "Dark Mode" : "Light Mode"}
      </button>
    </header>
  );
};

export default Header;
