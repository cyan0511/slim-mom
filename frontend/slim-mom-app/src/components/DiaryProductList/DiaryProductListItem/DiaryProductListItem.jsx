import css from './DiaryProductListItem.module.css';
import {useDispatch} from "react-redux";
import {deleteDiary} from "../../../redux/diaries/operations";

export const DiaryProductListItem = ({ diary, onDelete }) => {
    // const calories = (product.grams * product.calories) / 100;
    const dispatch = useDispatch();

    const handleDelete = e => {
      dispatch(deleteDiary(diary._id));
    };

    return (
        <li className={css.item}>
            <span className={css.product}>{diary.title}</span>
            <span className={css.grams}>{diary.grams} g</span>
            <span className={css.calories}>{Math.round(diary.calories)} kcal</span>

            <button type="button" className={css.deleteButton} onClick={handleDelete}>
                &times;
            </button>
        </li>
    )
}

