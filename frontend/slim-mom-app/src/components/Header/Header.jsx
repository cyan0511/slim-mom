import { Navigation } from '../Navigation/Navigation';
import { useAuth } from '../../hooks/useAuth';
import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import {AuthNav} from "../AuthNav/AuthNav";


export const Header = () => {
    const { isLoggedIn } = useAuth();

    return (
        <header className={ isLoggedIn ? css.authHeader : css.header}>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? css.linkActive : css.link)}
            >
                <Logo />

            </NavLink>
            <Navigation className={css.navigation} />
            {isLoggedIn ? (<><div>logged in</div></>): <AuthNav /> }
        </header>
    );
};
