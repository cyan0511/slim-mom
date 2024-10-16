import { Navigation } from '../Navigation/Navigation';
// import { useAuth } from '../../hooks/useAuth';
import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { useAuth } from '../../hooks/useAuth';
import { UserInfo } from '../UserInfo/UserInfo';

export const Header = () => {
    const { isLoggedIn } = useAuth();
    return (
        <header className={ css.header}>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? css.linkActive : css.link)}
            >
                <Logo />

            </NavLink>
            <Navigation />
          {isLoggedIn && <UserInfo className={css.userInfo} />}
        </header>
    );
};
