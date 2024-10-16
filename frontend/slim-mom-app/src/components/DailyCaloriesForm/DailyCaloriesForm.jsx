import css from './DailyCaloriesForm.module.css';
import { TextField } from '../TextField/TextField';
import RadioGroup from '../RadioGroup/RadioGroup';
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import DailyCalorieIntake from '../Modal/DailyCalorieIntake/DailyCalorieIntake';

export const DailyCaloriesForm = () => {
  const [formData, setFormData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    openModal();
  };

  const handleChange = (value, field) => {
    // setSelectedValue(+event.target.value);

    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const options = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
  ];


  const calculateIntake = () => {
    //
    const { height, currentWeight: weight, age, desiredWeight } = formData;
    return (
      10 * weight +
      6.25 * height -
      5 * age -
      161 -
      10 * (weight - desiredWeight)

    const calculateIntake = () => {
        //
        const {height, currentWeight: weight, age, desiredWeight} = formData;
        return 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight);
    }

    return (<>
            <Modal children={<div>{calculateIntake()}</div>} isOpen={isOpen} onClose={closeModal}/>
            <div className={css.container}>
                <h1>Calculate your daily calorie
                    intake right now</h1>
                <form className={css.form} onSubmit={handleSubmit}>
                    <div className={css.infoContainer}>
                        <div className={css.info}>
                            <TextField className={css.textField} onChange={e => handleChange(+e.target.value, 'height')}
                                type="number" label="Height *" id="height"/>
                            <TextField className={css.textField} onChange={e => handleChange(+e.target.value, 'age')}
                                type="number" label="Age *" id="age"/>
                            <TextField className={css.textField}
                                onChange={e => handleChange(+e.target.value, 'currentWeight')} type="number"
                                label="Current weight *" id="current-weight"/>
                        </div>
                        <div className={css.info}>
                            <TextField className={css.textField}
                                onChange={e => handleChange(+e.target.value, 'desiredWeight')} type="number"
                                label="Desired weight *" id="desired-weight"/>
                            <div className={css.bloodTypeContainer}>
                                <span>Blood type*</span>
                                <div>
                                    <RadioGroup value={+formData['bloodType']}
                                        onChange={e => handleChange(+e.target.value, 'bloodType')} name="blood-type"
                                        options={options}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.button}>
                        <button className="button" type="submit">Start losing weight</button>
                    </div>
                </form>
            </div>
        </>

    );
  };

  return (
    <>
      <Modal
        children={<DailyCalorieIntake intake={calculateIntake()} />}
        isOpen={isOpen}
        onClose={closeModal}
      />
      <div className={css.container}>
        <h1>Calculate your daily calorie intake right now</h1>
        <form className={css.form} onSubmit={handleSubmit}>
          <div className={css.infoContainer}>
            <div className={css.info}>
              <TextField
                className={css.textField}
                onChange={(e) => handleChange(+e.target.value, 'height')}
                type="number"
                label="Height *"
                id="height"
              />
              <TextField
                className={css.textField}
                onChange={(e) => handleChange(+e.target.value, 'age')}
                type="number"
                label="Age *"
                id="age"
              />
              <TextField
                className={css.textField}
                onChange={(e) => handleChange(+e.target.value, 'currentWeight')}
                type="number"
                label="Current weight *"
                id="current-weight"
              />
            </div>
            <div className={css.info}>
              <TextField
                className={css.textField}
                onChange={(e) => handleChange(+e.target.value, 'desiredWeight')}
                type="number"
                label="Desired weight *"
                id="desired-weight"
              />
              <div className={css.bloodTypeContainer}>
                <span>Blood type*</span>
                <div>
                  <RadioGroup
                    value={+formData['bloodType']}
                    onChange={(e) => handleChange(+e.target.value, 'bloodType')}
                    name="blood-type"
                    options={options}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={css.button}>
            <button type="submit">Start losing weight</button>
          </div>
        </form>
      </div>
    </>
  );
};
