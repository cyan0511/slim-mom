import { Navigation } from '../Navigation/Navigation';
// import { useAuth } from '../../hooks/useAuth';
import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { useAuth } from '../../hooks/useAuth';
import { UserInfo } from '../UserInfo/UserInfo';
import { BurgerMenuBtn } from '../BurgerMenuBtn/BurgerMenuBtn';

export const Header = () => {
  const { isLoggedIn } = useAuth();
  return (
      <header className={css.header}>
        <NavLink
            to="/"
            className={({ isActive }) => (isActive ? css.linkActive : css.link)}
        >
          <Logo/>

        </NavLink>
        <Navigation/>
        {isLoggedIn &&
            (
                <div className={css.authMenu}>
                  <UserInfo className={css.userInfo}/>
                  <BurgerMenuBtn/>
                </div>
            )}
      </header>
  );
};
