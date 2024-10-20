import React from 'react';
import {
  DailyCaloriesForm,
} from '../../components/DailyCaloriesForm/DailyCaloriesForm';
import { RightSideBar } from '../../components/RightSideBar/RightSideBar';
import { useSelector } from 'react-redux';
import { getDate } from '../../redux/diaries/selectors';
import { parse } from 'date-fns';

const CalculatorPage = () => {
  const diaryDate = useSelector(getDate);
  const date = parse(diaryDate, 'dd.MM.yyyy', new Date());
  const info = {}; // useSelector(getUserInfo);
  const userInfo = { ...info };

  // Remove unnecessary properties from userInfo
  delete userInfo.dailyRate;
  delete userInfo.notAllowedProducts;
  delete userInfo.notAllowedProductsAll;

  return (
      <div>
        <DailyCaloriesForm/>
        <RightSideBar date={date}/>
      </div>
  );
};

export default CalculatorPage;
