import React, { useState } from 'react';
import {
  DiaryDateCalendar,
} from '../../components/DiaryDateCalendar/DiaryDateCalendar';
import {
  DiaryProductList,
} from '../../components/DiaryProductList/DiaryProductList';
import css from './DiaryPage.module.css';
import {
  DiaryAddProductForm,
} from '../../components/DiaryAddProductForm/DiaryAddProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { listDiaries, setDate } from '../../redux/diaries/operations';
import { getDate, getDiaries } from '../../redux/diaries/selectors';
import { RightSideBar } from '../../components/RightSideBar/RightSideBar';
import { useMediaQuery } from '@mui/material';
import clsx from 'clsx';
import Modal from '../../components/Modal/Modal';
import { format, parse } from 'date-fns';

const DiaryPage = () => {
  const dispatch = useDispatch();
  const diaries = useSelector(getDiaries);

  const diaryDate = useSelector(getDate);
  const date = parse(diaryDate, 'dd.MM.yyyy', new Date());
  const [selectedDate, setSelectedDate] = useState(date);
  const isDesktop = useMediaQuery('(min-width:376px)'); // Change threshold as needed
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    const formattedDate = format(date, 'dd.MM.yyyy');
    setSelectedDate(date);
    dispatch(setDate(formattedDate));
    dispatch(listDiaries(date));
  };

  return (
      <>
        {!isDesktop &&
            <Modal isOpen={isOpen}
                children={<DiaryAddProductForm onAdd={() => setIsOpen(false)}
                    date={selectedDate}/>}
                onClose={() => setIsOpen(prevState => !prevState)}
            />}
        <div className={css.container}>
          <section className={css.diarySection}>
            <DiaryDateCalendar
                date={selectedDate}
                onDateChange={handleDateChange}
            />

            {isDesktop && <DiaryAddProductForm date={selectedDate}/>}

            <DiaryProductList
                diaries={diaries || []}
            />

            {!isDesktop &&
                <button type="submit" onClick={() => setIsOpen(true)}
                    className={clsx('button', css.addButton)}>+</button>}
          </section>
        </div>
        <RightSideBar date={selectedDate}/>
      </>
  );
};

export default DiaryPage;