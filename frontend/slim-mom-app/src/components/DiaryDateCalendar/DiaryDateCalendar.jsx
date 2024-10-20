import React from 'react';
import css from './DiaryDateCalendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import iconsvg from "../../assets/images/icons.svg";
import { format } from 'date-fns';


export const DiaryDateCalendar = ({ date, onDateChange }) => {
    const formattedDate = format(date, 'dd.MM.yyyy');
    // const selectedDate = parse(date, 'dd.MM.yyyy', new Date());
    return (
        <div className={css.datePickerContainer}>
            <span className={css.dateLabel}>{formattedDate}</span>
            <DatePicker
                selected={date}
                onChange={onDateChange}
                customInput={<CustomInput />}
                popperContainer={({ children }) => (
                    <div className={css.fixedPopper}>{children}</div>
                )}
                className={css.datePickerInput}
            />
        </div>
    );
};

const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button className={css.iconButton} onClick={onClick} ref={ref}>
        <svg  width="20" height="20">
            <use href={`${iconsvg}#calendar`}/>
        </svg>
    </button>
));
