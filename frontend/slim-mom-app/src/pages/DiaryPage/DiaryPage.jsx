import React, {useEffect, useState} from 'react';
import {DiaryDateCalendar} from "../../components/DiaryDateCalendar/DiaryDateCalendar";
import {DiaryProductList} from "../../components/DiaryProductList/DiaryProductList";
import css from "./DiaryPage.module.css"
import {DiaryAddProductForm} from "../../components/DiaryAddProductForm/DiaryAddProductForm";
import {useDispatch, useSelector} from "react-redux";
import {listDiaries, setDate} from "../../redux/diaries/operations";
import {getDate, getDiaries} from "../../redux/diaries/selectors";
import {RightSideBar} from "../../components/RightSideBar/RightSideBar";
import {useMediaQuery} from "@mui/material";
import clsx from "clsx";
import Modal from "../../components/Modal/Modal";


const DiaryPage = () => {
    const dispatch = useDispatch();
    const diaries = useSelector(getDiaries);

    const diaryDate = useSelector(getDate);
    const [selectedDate, setSelectedDate] = useState(diaryDate);
    const isDesktop = useMediaQuery('(min-width:376px)'); // Change threshold as needed
    const [isOpen, setIsOpen] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        dispatch(setDate(date));
        dispatch(listDiaries(date));
    }

    useEffect(() => {
        // dispatch(listProducts());
        // dispatch(listDiaries(diaryDate));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {!isDesktop &&
            <Modal isOpen={isOpen}
                children={<DiaryAddProductForm onAdd={() => setIsOpen(false)} date={selectedDate} />}
                onClose={() => setIsOpen(prevState => !prevState)}
            />}
            <div className={css.container}>
                <section className={css.diarySection}>
                    <DiaryDateCalendar
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                    />

                    {isDesktop && <DiaryAddProductForm date={selectedDate}/>}

                    <DiaryProductList
                        diaries={diaries || []}
                    />

                    {!isDesktop && <button type="submit" onClick={() => setIsOpen(true)} className={clsx('button', css.addButton)}>+</button>}
                </section>
            </div>
            <RightSideBar date={selectedDate}/>
        </>
    )
}

export default DiaryPage;