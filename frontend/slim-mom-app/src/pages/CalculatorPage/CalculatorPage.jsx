import React from "react";
// import { getUserInfo } from "../../redux/auth/authSelectors";
import { DailyCaloriesForm } from "../../components/DailyCaloriesForm/DailyCaloriesForm";
import {RightSideBar} from "../../components/RightSideBar/RightSideBar";
import {useSelector} from "react-redux";
import {getDate} from "../../redux/diaries/selectors";

const CalculatorPage = () => {
  const diaryDate = useSelector(getDate);
  const info = {}; // useSelector(getUserInfo);
  const userInfo = { ...info };

  // Remove unnecessary properties from userInfo
  delete userInfo.dailyRate;
  delete userInfo.notAllowedProducts;
  delete userInfo.notAllowedProductsAll;

  return (
    <div>
      <DailyCaloriesForm/>
      <RightSideBar date={diaryDate} />
    </div>
  );
};

export default CalculatorPage;
