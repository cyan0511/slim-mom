import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';

export const AuthNav = ({ onClick }) => (
  <div className={css.actionButtons}>
    <NavLink
      onClick={onClick}
      to="/login"
      className={({ isActive }) => (isActive ? css.active : '')}
    >
      Log In
    </NavLink>
    <NavLink
      onClick={onClick}
      to="/register"
      className={({ isActive }) => (isActive ? css.active : '')}
    >
      Registration
    </NavLink>
  </div>
);
