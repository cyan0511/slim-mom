import React from "react";
import { Link } from "react-router-dom";
import { Calculator } from "../../components/Calculator/Calculator";
import { DailyCaloriesForm } from "../../components/DailyCaloriesForm/DailyCaloriesForm";
import style from "../CalculatorPage/CalculatorPage.module.css";

export const CalculatorPage = () => {
  return (
    <div className={style.calcPage}>
      <div className={style.navbar}>
        <div className={style.logo}>
          <Link to="/SlimMom" className={style.logoTitle}>
            Slim<span className={style.logoColor}>Mom</span>
          </Link>
        </div>
        <ul className={style.menuList}>
          <li>
            <Link to="/diary" className={style.link}>
              Diary
            </Link>
          </li>
          <li>
            <Link to="/calc" className={style.link}>
              Calculator
            </Link>
          </li>
        </ul>
      </div>
      <DailyCaloriesForm />
      <Calculator />
    </div>
  );
};
