import css from './DiaryProductListItem.module.css';

export const DiaryProductListItem = ({ product, onDelete }) => {
    const calories = (product.grams * product.calories) / 100;
    return (
        <li className={css.item}>
            <span className={css.product}>{product.title}</span>
            <span className={css.grams}>{product.grams}</span>
            <span className={css.calories}>{Math.round(calories)} kcal</span>

            <button type="button" className={css.deleteButton} onClick={onDelete}>
                &times;
            </button>
        </li>
    )
}

