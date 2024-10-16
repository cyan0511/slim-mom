import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import css from './DiaryAddProductForm.module.css';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/products/selectors';
import { addDiary } from '../../redux/diaries/operations';
import { Notify } from 'notiflix';
import clsx from 'clsx';
import { format } from 'date-fns';

export const DiaryAddProductForm = ({ date, onAdd }) => {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);

  const formattedDate = format(date, 'yyyy-MM-dd');

  const [formData, setFormData] = useState({});
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        productId: formData.product?._id,
        date: formattedDate,
        grams: formData.grams,
      };
      await dispatch(addDiary(data)).unwrap();
      onAdd && onAdd();
    } catch (ex) {
      console.log(ex);
      Notify.failure(ex.message);
    }
    setFormData({});
  };

  const defaultProps = {
    options: products,
    getOptionLabel: (option) => `${option.title} (${option.calories}cal)`,
  };

  return (
      <form className={css.form} onSubmit={handleSubmit}>
        <Autocomplete
            value={formData.product || null}
            onChange={(e, product) => handleChange('product', product)}
            fullWidth={false}
            className={css.productName}
            {...defaultProps}
            id="product"
            autoComplete
            includeInputInList
            renderOption={(props, option) => (
                <li {...props} key={option._id}>
                  {option.title}
                </li>
            )}
            renderInput={(params) => (
                <TextField {...params} required label="Enter product name"
                    variant="standard"/>
            )}
        />

        <TextField
            required
            className={css.grams}
            variant="standard"
            id="grams"
            name="grams"
            type="number"
            label="Grams"
            value={formData.grams === 0 ? '' : formData.grams || ''}
            onChange={(e) => handleChange('grams', +e.target.value)}
        />
        <button type="submit" className={clsx('button', css.addButton)}>
          <span>Add</span></button>
      </form>
  );
};
