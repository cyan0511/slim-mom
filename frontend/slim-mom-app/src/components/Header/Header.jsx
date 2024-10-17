import { Navigation } from '../Navigation/Navigation';
// import { useAuth } from '../../hooks/useAuth';
import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { useAuth } from '../../hooks/useAuth';
import { UserInfo } from '../UserInfo/UserInfo';
import { BurgerMenuBtn } from '../BurgerMenuBtn/BurgerMenuBtn';
import { useMediaQuery } from '@mui/material';

export const Header = () => {
  const { isLoggedIn } = useAuth();
  const isMobile = useMediaQuery('(max-width:378px)'); // Change threshold as needed
  const isTablet = useMediaQuery('(max-width:786px)'); // Change threshold as needed
  return (
      <>
        <header className={css.header}>
          <NavLink
              to="/"
              className={({ isActive }) => (isActive
                  ? css.linkActive
                  : css.link)}
          >
            <Logo/>

          </NavLink>
          {!(isTablet || isMobile) && isLoggedIn && <Navigation/>}
          {!isLoggedIn && <Navigation/>}
          {isLoggedIn &&
              (
                  <div className={css.authMenu}>
                    {!isMobile && <UserInfo className={css.userInfo}/>}
                    {(isMobile || isTablet) && <BurgerMenuBtn/>}
                  </div>
              )}
        </header>
        {isLoggedIn && isMobile && <UserInfo className={css.userInfo}/>}
      </>
  );
};
