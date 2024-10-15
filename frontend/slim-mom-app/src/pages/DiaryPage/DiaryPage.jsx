import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DiaryDateCalendar } from "../../components/DiaryDateCalendar/DiaryDateCalendar";
import { DiaryProductList } from "../../components/DiaryProductList/DiaryProductList";
import css from "./DiaryPage.module.css"
import { DiaryAddProductForm } from "../../components/DiaryAddProductForm/DiaryAddProductForm";
import { useDispatch } from "react-redux";
import {listProducts} from "../../redux/products/operations";


const DiaryPage = () => {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        dispatch(listProducts());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDeleteProduct = async productId => {
        try {
            await axios.delete(
                `http://localhost:3000/api/producst/consumed/${productId}`,
                // {
                //     headers: {
                //         Authorization: `Bearer ${auth.token}`,
                //     },
                // }
            );
            /*setConsumedProducts(prevProducts =>
                prevProducts.filter(product => product.consumedProductId !== productId)
            );*/
        } catch (error) {
            console.error('Erro deleting consumed product:', error);
        }
    };

    return (
        <div className={css.container}>
            <section className={css.diarySection}>
                <DiaryDateCalendar
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                />

                <DiaryAddProductForm />

                <DiaryProductList
                    products={[]}
                    onDelete={handleDeleteProduct}
                />
            </section>
        </div>
    )
}

export default DiaryPage;