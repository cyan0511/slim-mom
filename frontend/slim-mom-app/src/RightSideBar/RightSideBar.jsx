import { useSelector } from "react-redux";
import styles from "../RightSideBar/RightSideBar.module.css";

export const RightSideBar = () => {
  const date = useSelector((state) => state.products.date);
  const dailyRate = useSelector((state) => state.auth.userInfo.dailyRate);
  const notAllowedProducts = useSelector(
    (state) => state.auth.userInfo.notAllowedProducts
  );
  const productsList = useSelector((state) => state.products.productsList);
  const totalCalories = productsList
    .map((product) => product.productCalories)
    .reduce((prev, product) => {
      return Number.parseInt(prev) + Number.parseInt(product);
    }, 0);
  const leftCalories = dailyRate - totalCalories;
  const nOfNorm = (totalCalories / dailyRate) * 100;

  return (
    <div className={styles.wrapper}>
      <div className={styles.summaryWrap}>
        <h3 className={styles.title}>Summary for {date}</h3>
        <ul>
          <li className={styles.item}>
            <p className={styles.text}>Left</p>
            {leftCalories < 0 ? (
              <p className={styles.redText}>{leftCalories} kcal</p>
            ) : (
              <p className={styles.text}>
                {leftCalories ? leftCalories : "000"} kcal
              </p>
            )}
          </li>
          <li className={styles.item}>
            <p className={styles.text}>Consumed</p>
            <p className={styles.text}>
              {totalCalories ? totalCalories : "000"} kcal
            </p>
          </li>
          <li className={styles.item}>
            <p className={styles.text}>Daily rate</p>
            <p className={styles.text}>{dailyRate ? dailyRate : "000"} kcal</p>
          </li>
          <li className={styles.item}>
            <p className={styles.text}>n% of normal</p>
            {nOfNorm > 100 ? (
              <p className={styles.redText}>
                {nOfNorm ? Math.round(nOfNorm) : "0"} %
              </p>
            ) : (
              <p className={styles.text}>
                {nOfNorm ? Math.round(nOfNorm) : "0"} %
              </p>
            )}
          </li>
        </ul>
      </div>
      <div className={styles.foodWrap}>
        <h3 className={styles.title}>Food not recommended</h3>
        {notAllowedProducts ? (
          <ul>
            {notAllowedProducts.map((prod, index) => (
              <p className={styles.text} key={index}>
                {index + 1}. {prod}
              </p>
            ))}
          </ul>
        ) : (
          <p className={styles.text}>Your diet will be displayed here</p>
        )}
      </div>
    </div>
  );
};
