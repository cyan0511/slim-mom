import { NavLink } from 'react-router-dom';
import css from '../TransactionsHistoryNav/TransactionsHistoryNav.module.css';

export const TransactionsHistoryNav = ({onClick, className, activeClass}) => {
  return (
    <div className={`${css.container} ${className}`}>
      <NavLink onClick={onClick}
        to="/transactions/history/expenses"
        className={({ isActive }) => (isActive ? `primary-button ${activeClass}` : 'secondary-button')}
      >
        All Expense
      </NavLink>
      <NavLink onClick={onClick}
        style={{ textDecoration: 'none' }}
        to="/transactions/history/incomes"
        className={({ isActive }) => (isActive ? `primary-button ${activeClass}` : 'secondary-button')}
      >
        All Income
      </NavLink>

    </div>
  );
};
