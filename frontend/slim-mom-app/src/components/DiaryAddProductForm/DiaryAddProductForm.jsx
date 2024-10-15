import React, {useState} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import css from './DiaryAddProductForm.module.css';
import {TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {getProducts} from "../../redux/products/selectors";

export const DiaryAddProductForm = () => {
    const products = useSelector(getProducts);

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

    const defaultProps = {
        options: products,
        getOptionLabel: (option) => `${option.title} (${option.calories}kcal)`,
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            {/*     <TextField
                id="productName"
                name="productName"
                type="text"
                label="Enter product name"
                value={formData.productName}
                onChange={handleChange}
            />*/}

                <Autocomplete
                    fullWidth={false}
                    className={css.productName}
                    {...defaultProps}
                    id="product"
                    autoComplete
                    includeInputInList
                    renderInput={(params) => (
                        <TextField {...params} label="Enter product name" variant="standard" />
                    )}
                />

                <TextField
                    className={css.grams}
                    variant="standard"
                    id="grams"
                    name="grams"
                    type="number"
                    label="Grams"
                    value={formData.grams}
                    onChange={handleChange}
                />
                <button type="submit" className={css.addButton}><span>Add</span></button>
              </form>
    );
};
