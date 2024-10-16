import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import css from './Navigation.module.css';
import { MenuNav } from '../MenuNav/MenuNav';
import { AuthNav } from '../AuthNav/AuthNav';

const Navigation = ({ setOpenNavigation, openNavigation }) => {
  const { isLoggedIn } = useAuth();

  const handleClick = () => {
    setOpenNavigation(false);
  };

  return (
    <nav className={`nav ${openNavigation ? css.open : ''}`}>
      {isLoggedIn ? (
        <MenuNav onClick={handleClick} className={'styled-link'} />
      ) : (
        <AuthNav onClick={handleClick} className={'styled-link'} />
      )}
    </nav>
  );
};

export default Navigation;
