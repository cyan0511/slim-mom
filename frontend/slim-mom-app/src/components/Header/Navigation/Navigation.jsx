import React from 'react';
import './Navigation.css';

const Menu = ({ setOpenNavigation }) => {
  const handleClick = () => {
    setOpenNavigation(false);
  };

  return (
    <nav className={`nav `}>
      <a href="diary" className="styled-link" onClick={handleClick}>
        Diary
      </a>
      <a href="calculator" className="styled-link" onClick={handleClick}>
        Calculator
      </a>
    </nav>
  );
};

export default Menu;
