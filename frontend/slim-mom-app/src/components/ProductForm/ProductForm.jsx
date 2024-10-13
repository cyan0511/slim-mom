import React, {useState} from "react";
import Modal from "../Modal/Modal";
import css from './ProductForm.module.css';
import {TextField} from "../TextField/TextField";

export const ProductForm = () => {
    const [formData, setFormData] = useState({productName: '', grams: ''});
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <TextField
                id="productName"
                name="productName"
                type="text"
                label="Enter product name"
                value={formData.productName}
                onChange={handleChange}
            />
            <TextField
                id="grams"
                name="grams"
                type="number"
                label="Grams"
                value={formData.grams}
                onChange={handleChange}
            />
            <button type="submit" className={css.addButton}>Add</button>
        </form>
    );
};
