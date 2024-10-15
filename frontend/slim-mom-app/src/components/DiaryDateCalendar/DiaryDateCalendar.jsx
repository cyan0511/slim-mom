import React from 'react';
import css from './DiaryDateCalendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import { format } from 'date-fns';


export const DiaryDateCalendar = ({ selectedDate, onDateChange }) => {
    const formattedDate = format(selectedDate, 'dd.MM.yyyy');
    return (
        <div className={css.datePickerContainer}>
            <span className={css.dateLabel}>{formattedDate}</span>
            <DatePicker
                selected={selectedDate}
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
        <FaCalendarAlt />
    </button>
));
