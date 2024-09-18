import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

export const AuthNav = () => (
    <div className={css.actionButtons}>
        <NavLink to="/login"
            className={({ isActive }) => isActive ? css.active : ''}>
            Log In
        </NavLink>
        <NavLink
            to="/signup"
            className={({ isActive }) => isActive ? css.active : ''}>
           Registration
        </NavLink>

    </div>
)
