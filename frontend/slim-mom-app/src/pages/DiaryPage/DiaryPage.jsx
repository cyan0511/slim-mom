import React, { useEffect, useState } from 'react';
import { DiaryDateCalendar } from "../../components/DiaryDateCalendar/DiaryDateCalendar";
import { DiaryProductList } from "../../components/DiaryProductList/DiaryProductList";
import css from "./DiaryPage.module.css"
import { DiaryAddProductForm } from "../../components/DiaryAddProductForm/DiaryAddProductForm";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../../redux/products/operations";
import {listDiaries} from "../../redux/diaries/operations";
import {getDiaries} from "../../redux/diaries/selectors";


const DiaryPage = () => {
    const dispatch = useDispatch();
    const diaries = useSelector(getDiaries);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        dispatch(listProducts());
        dispatch(listDiaries());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={css.container}>
            <section className={css.diarySection}>
                <DiaryDateCalendar
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                />

                <DiaryAddProductForm date={selectedDate} />

                <DiaryProductList
                    diaries={diaries || []}
                />
            </section>
        </div>
    )
}

export default DiaryPage;