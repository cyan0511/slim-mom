import css from './DailyCaloriesForm.module.css';
import {TextField} from "../TextField/TextField";
import RadioGroup from "../RadioGroup/RadioGroup";
import React, {useState} from "react";
import Modal from "../Modal/Modal";

export const DailyCaloriesForm = () => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSubmit = e => {
        e.preventDefault();
        openModal();
    }

    const handleChange = (event) => {
        setSelectedValue(+event.target.value);
    };
    const options = [
        {value: 1, label: '1'},
        {value: 2, label: '2'},
        {value: 3, label: '3'},
        {value: 4, label: '4'},
    ];


    return (<>
            <Modal children={<div>test</div>} isOpen={isOpen} onClose={closeModal}  />
            <div className={css.container}>
                <h1>Calculate your daily calorie
                    intake right now</h1>
                <form className={css.form} onSubmit={handleSubmit} >
                    <div className={css.infoContainer}>
                        <div className={css.info}>
                            <TextField className={css.textField} label="Height *" id="height"/>
                            <TextField className={css.textField} label="Age *" id="age"/>
                            <TextField className={css.textField} label="Current weight *" id="current-weight"/>
                        </div>
                        <div className={css.info}>
                            <TextField className={css.textField} label="Desired weight *" id="desired-weight"/>
                            <div className={css.bloodTypeContainer}>
                                <span>Blood type*</span>
                                <div>
                                    <RadioGroup value={selectedValue} onChange={handleChange} name="blood-type"
                                        options={options}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={css.button}>
                        <button type="submit">Start loosing weight</button>
                    </div>
                </form>
            </div>
        </>
    );

}
