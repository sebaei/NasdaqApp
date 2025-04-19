import React from 'react';
import '../styles/Header.scss';
import NasdaqLogo from "../assets/Nasdaq.webp"

type HeaderProps = {
  onSearch: (value: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const Header: React.FC<HeaderProps> = ({ onSearch, darkMode, toggleDarkMode }) => {
  return (
    <header className={`explore-header ${darkMode ? 'dark' : ''}`}>
      <img src={NasdaqLogo} alt='Nasdaq Logo' className='logo' />
      <input
        type="text"
        placeholder="Stocks..."
        onChange={(e) => onSearch(e.target.value)}
        className="search-input"
      />
      <button className="toggle-btn" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
};

export default Header;
