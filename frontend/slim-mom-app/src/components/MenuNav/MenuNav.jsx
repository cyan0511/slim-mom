import {NavLink} from 'react-router-dom';
import css from './MenuNav.module.css';

export const MenuNav = ({onClick, className}) => {
    return (
        <div className={`${css.container} ${className}`}>
            <NavLink onClick={onClick}
                to="/diary"
                className={({isActive}) => isActive ? css.active : ''}
            >
                Diary
            </NavLink>
            <NavLink onClick={onClick}
                to="/calculator"
                className={({isActive}) => isActive ? css.active : ''}
            >
                Calculator
            </NavLink>

        </div>
    );
};
