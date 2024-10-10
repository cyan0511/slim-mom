import React, { useState } from "react";
import Modal from "../Modal/Modal";
import RadioGroup from "../RadioGroup/RadioGroup";
import { TextField } from "../TextField/TextField";
import css from "./DailyCaloriesForm.module.css";
import { Loader } from "../Loader/Loader";

export const DailyCaloriesForm = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // ALFRED: TEST VARIABLE ONLY
  const [testSpin, setTestSpin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal();
  };

  const handleTestSpinner = (event) => {
    setTimeout(() => {
      setTestSpin(false);
    }, 3000);

    setTestSpin(true);
  };
  const options = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
  ];

  const handleChange = (event) => {
    setSelectedValue(+event.target.value);
  };

  return (
    <>
      <Modal children={<div>test</div>} isOpen={isOpen} onClose={closeModal} />
      <div className={css.container}>
        <h1>Calculate your daily calorie intake right now</h1>
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.infoContainer}>
            <div className={css.info}>
              <TextField
                className={css.textField}
                label="Height *"
                id="height"
              />
              <TextField className={css.textField} label="Age *" id="age" />
              <TextField
                className={css.textField}
                label="Current weight *"
                id="current-weight"
              />
            </div>
            <div className={css.info}>
              <TextField
                className={css.textField}
                label="Desired weight *"
                id="desired-weight"
              />
              <div className={css.bloodTypeContainer}>
                <span>Blood type*</span>
                <div>
                  <RadioGroup
                    value={selectedValue}
                    onChange={handleChange}
                    name="blood-type"
                    options={options}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={css.button}>
            <button type="submit">Start loosing weight</button>
          </div>
        </form>
        <div className={css.button}>
          <button type="button" onClick={handleTestSpinner}>
            Test Spinner
          </button>
        </div>
        {testSpin && <Loader />}
      </div>
    </>
  );
};
