import React, { useState } from "react";
import { DailyCaloriesForm } from "../../components/DailyCaloriesForm/DailyCaloriesForm";
import {
  Wrapper,
  CalculatorWrapper,
  H2,
} from "../../components/CalculatorPage/CalculatorPage.styled";
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
    <Wrapper>
      <CalculatorWrapper>
        {isModalOpened && (
          <Modal onClose={toggleModal} userParams={userParams} />
        )}
        <div className="content">
          <H2>Calculate your daily calorie intake right now</H2>
          <DailyCaloriesForm
            initialValues={userInfo}
            openModal={setIsModalOpened}
            setUserParams={setUserParams}
          />
        </div>
      </CalculatorWrapper>
      <SideBar />
    </Wrapper>
  );
};

export default CalculatorPage;
