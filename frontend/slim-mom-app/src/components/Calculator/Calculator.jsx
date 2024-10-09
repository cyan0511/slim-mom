import React from "react";
import css from "../Calculator/Calculator.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/authOperations";

export const Calculator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user = {} } = useSelector((state) => state.auth);
  const { name, avatarUrl, infouser = {} } = user;
  const { notAllowedProducts = [], dailyRate = 0 } = infouser;

  const products = useSelector(
    (state) => state.myproducts?.products?.dates || []
  );
  const today = new Date().toISOString().split("T")[0];
  const todayProducts = products.filter((entry) => entry.date === today);

  const consumed = todayProducts
    .flatMap((entry) => entry.products.map((p) => p.newCalories))
    .reduce((total, cal) => total + cal, 0);

  const left = dailyRate - consumed;
  const consumedPercentage = Math.round((consumed * 100) / dailyRate) || 0;

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/SlimMom");
  };

  return (
    <div className={css.calculator}>
      <div className={css.userSection}>
        <div className={css.avatarWrapper}>
          <img src={avatarUrl} alt="Avatar" className={css.avatar} />
        </div>
        <span className={css.userName}>{name}</span>
        <button onClick={handleLogout} className={css.logoutButton}>
          Exit
        </button>
      </div>

      <div className={css.summary}>
        <h2>Summary for {new Date().toLocaleDateString("en-GB")}</h2>
        <ul className={css.stats}>
          <li className={css.list}>
            <span>Left</span>
            <span className={css.span}>{left} kcal</span>
          </li>
          <li className={css.list}>
            <span>Consumed</span>
            <span className={css.span}>{Math.round(consumed)} kcal</span>
          </li>
          <li className={css.list}>
            <span>Daily rate</span>
            <span className={css.span}>{dailyRate} kcal</span>
          </li>
          <li className={css.list}>
            <span>n% of normal</span>
            <span className={css.span}>{consumedPercentage}% kcal</span>
          </li>
        </ul>
      </div>

      <div className={css.notRecommended}>
        <h2>Food not recommended</h2>
        <ul>
          {notAllowedProducts.length > 0 ? (
            notAllowedProducts.map((product, index) => (
              <li key={index}>{product}</li>
            ))
          ) : (
            <li>No products found</li>
          )}
        </ul>
      </div>
    </div>
  );
};
