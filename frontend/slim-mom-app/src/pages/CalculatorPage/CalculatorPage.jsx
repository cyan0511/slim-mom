import React, { useState } from "react";
import styles from "../../components/CalculatorPage/CalculatorPage.module.module.css";
import { getUserInfo } from "../../redux/auth/authSelectors";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
import { RightSideBar } from "../../components/RightSideBar/RightSideBar";
import { DailyCaloriesForm } from "../../components/DailyCaloriesForm/DailyCaloriesForm";

const CalculatorPage = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [userParams, setUserParams] = useState(null);
  const info = useSelector(getUserInfo);
  const userInfo = { ...info };

  // Remove unnecessary properties from userInfo
  delete userInfo.dailyRate;
  delete userInfo.notAllowedProducts;
  delete userInfo.notAllowedProductsAll;

  const body = document.querySelector("body");

  const onModalClose = () => {
    setIsModalOpened((prev) => !prev);
    body.style.overflow = "auto";
  };

  return (
    <div className={styles.wrapperAll}>
      {" "}
      {/* Apply the wrapperAll class */}
      <div className={styles.calculatorPageWrapper}>
        {" "}
        {/* Apply the calculatorPageWrapper class */}
        {isModalOpened && (
          <Modal onClose={onModalClose} userParams={userParams} />
        )}
        <h2 className={styles.h2}>
          Calculate your daily calorie intake right now
        </h2>{" "}
        {/* Apply the h2 class */}
        <DailyCaloriesForm
          initialValues={userInfo}
          openModal={setIsModalOpened}
          setUserParams={setUserParams}
        />
      </div>
      <RightSideBar />
    </div>
  );
};

export default CalculatorPage;
