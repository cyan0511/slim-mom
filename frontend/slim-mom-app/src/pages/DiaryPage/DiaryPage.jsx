import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DiaryDateCalendar } from "../../components/DiaryDateCalendar/DiaryDateCalendar";
import { DiaryProductList } from "../../components/DiaryProductList/DiaryProductList";
import css from "./DiaryPage.module.css"

const DiaryPage = () => {
    const [consumedProducts, setConsumedProducts] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(()=> {
        const fetchConsumedProducts = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/products/day-info',
                    {
                        params: { date: selectedDate.toISOString() },
                        // headers: {
                        //     Authorization: `Bearer ${auth.token}`,
                        // },
                    }
                );

                const consumedProducts = response.data.consumedProducts.map(cp => ({
                    ...cp.productId,
                    grams: cp.quantity,
                    consumedProductId: cp._id,
                }));

                setConsumedProducts(consumedProducts);
            } catch (error) {
                console.error('Error fetching consumed products:', error);
            }
        };

        fetchConsumedProducts();
    },[selectedDate, setConsumedProducts]);

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
            setConsumedProducts(prevProducts =>
                prevProducts.filter(product => product.consumedProductId !== productId)
            );
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

                <DiaryProductList
                    products={consumedProducts}
                    onDelete={handleDeleteProduct}
                />
            </section>
        </div>
    )
}

export default DiaryPage;