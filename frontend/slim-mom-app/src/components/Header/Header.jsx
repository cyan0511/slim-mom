import { Navigation } from '../Navigation/Navigation';
import { useAuth } from '../../hooks/useAuth';
import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import {AuthNav} from "../AuthNav/AuthNav";
import {MenuNav} from "../MenuNav/MenuNav";


export const Header = () => {
    const { isLoggedIn } = useAuth();
    console.log(isLoggedIn);
    return (
        <header className={ css.header}>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? css.linkActive : css.link)}
            >
                <Logo />

            </NavLink>
            <Navigation />
        </header>
    );
};
