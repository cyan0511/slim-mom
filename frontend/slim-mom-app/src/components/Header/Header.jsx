import { Navigation } from '../Navigation/Navigation';
import { useAuth } from '../../hooks/useAuth';
import css from './Header.module.css';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/Logo';


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
