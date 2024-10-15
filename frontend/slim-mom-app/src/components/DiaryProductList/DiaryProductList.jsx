import { DiaryProductListItem } from './DiaryProductListItem/DiaryProductListItem';
import css from './DiaryProductList.module.css'

export const DiaryProductList = ({ diaries }) => {
    return (
        <ul className={css.list}>
            {diaries.map(diary => (
                <DiaryProductListItem
                    key={diary._id}
                    diary={diary}
                />
            ))}
        </ul>
    );
};
