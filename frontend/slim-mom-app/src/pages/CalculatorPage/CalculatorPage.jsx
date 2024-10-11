import React, { useState } from "react";
import { DailyCaloriesForm } from "../../components/DailyCaloriesForm/DailyCaloriesForm";
import styles from "../../components/CalculatorPage/CalculatorPage.module.css";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal/Modal";
import { SideBar } from "../../components/SideBar/SideBar";
import { user } from "../../redux/auth/authSelectors";

const CalculatorPage = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [userParams, setUserParams] = useState(null);
  const userInfo = useSelector(user);

  const toggleModal = () => {
    setIsModalOpened((prev) => !prev);
    document.body.style.overflow = isModalOpened ? "auto" : "hidden";
  };

  return (
    <div className={styles.wrapper}>
      {" "}
      {/* Applying CSS module styles */}
      <div className={styles.calculatorWrapper}>
        {" "}
        {/* Applying CSS module styles */}
        {isModalOpened && (
          <Modal onClose={toggleModal} userParams={userParams} />
        )}
        <div className="content">
          <h2 className={styles.h2}>
            {" "}
            {/* Applying CSS module styles */}
            Calculate your daily calorie intake right now
          </h2>
          <DailyCaloriesForm
            initialValues={userInfo}
            openModal={setIsModalOpened}
            setUserParams={setUserParams}
          />
        </div>
      </div>
      <SideBar />
    </div>
  );
};

export default CalculatorPage;
