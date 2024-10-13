import { DiaryProductListItem } from './DiaryProductListItem/DiaryProductListItem';
import css from './DiaryProductList.module.css'

export const DiaryProductList = ({ products, onDelete }) => {
    return (
        <ul className={css.list}>
            {products.map(product => (
                <DiaryProductListItem
                    key={product.consumedProductId}
                    product={product}
                    onDelete={() => onDelete(product.consumedProductId)}
                />
            ))}
        </ul>
    );
};
