import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './MenuNav.module.css';

export const MenuNav = ({ setOpenNavigation, className }) => {
  const handleClick = () => {
    setOpenNavigation(false);
  };

  return (
    <nav className={`${css.container} ${className}`}>
      <NavLink
        onClick={handleClick}
        to="/diary"
        className={({ isActive }) =>
          isActive ? `${css.styledLink} ${css.active}` : css.styledLink
        }
      >
        Diary
      </NavLink>
      <NavLink
        onClick={handleClick}
        to="/calculator"
        className={({ isActive }) =>
          isActive ? `${css.styledLink} ${css.active}` : css.styledLink
        }
      >
        Calculator
      </NavLink>
    </nav>
  );
};
