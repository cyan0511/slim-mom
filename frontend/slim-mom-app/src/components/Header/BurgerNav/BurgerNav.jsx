import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./BurgerNav.module.css";

export default function BurgerNav({ onClick, userId }) {
  return (
    <div className="burger-overlay">
      <ul className="burger-list">
        <li className="burger-item"></li>

        <li className="burger-item">
          <NavLink
            className="burger-link"
            onClick={onClick}
            to={`/${userId}/diary`}
          >
            Diary
          </NavLink>
        </li>
        <li className="burger-item">
          <NavLink
            className="burger-link"
            onClick={onClick}
            to={`/${userId}/calculator`}
          >
            Calculator
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

BurgerNav.propTypes = {
  onClick: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};
