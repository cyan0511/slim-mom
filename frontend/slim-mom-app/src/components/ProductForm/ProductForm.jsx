import React, { useState } from "react";
import Modal from "../Modal/Modal";
import css from './ProductForm.module.css';

export const ProductForm = () => {
    const [formData, setFormData] = useState({ productName: '', grams: '' });
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); 
        closeModal();
    };

    return (
        <>
            {/* Floating Action Button (FAB) for Checking that why i Add FAB*/}
            <button onClick={openModal} className={css.fab}>
                <span className={css.plusIcon}>+</span>
            </button>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <form className={css.form} onSubmit={handleSubmit}>
                    <div className={css.inputContainer}>
                        <input
                            id="productName"
                            name="productName"
                            type="text"
                            placeholder="Enter product name"
                            value={formData.productName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={css.inputContainer}>
                        <input
                            id="grams"
                            name="grams"
                            type="number"
                            placeholder="Grams"
                            value={formData.grams}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className={css.addButton}>Add</button>
                </form>
            </Modal>
        </>
    );
};
