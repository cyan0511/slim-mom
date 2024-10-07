import css from "./UserInfo.module.css";

export const UserInfo = () => {
  return (
    <>
      <div className={css.userWrapper}>
        <div className={css.container}>
          <h2 className={css.summaryTitle}>
            Summary for <span>00.00.2024</span>
          </h2>
          <ul className={css.summary}>
            <li className={css.summaryInfo}>
              Left<span>0 kcal</span>
            </li>
            <li className={css.summaryInfo}>
              Consumed<span>0 kcal</span>
            </li>
            <li className={css.summaryInfo}>
              Daily rate<span>0 kcal</span>
            </li>
            <li className={css.summaryInfo}>
              n% of normal<span>0 %</span>
            </li>
          </ul>
        </div>
        <div className={css.container}>
          <h2 className={css.summaryTitle}>Food not recommended</h2>
          <p className={css.summaryInfo}>Your diet will be displayed here</p>
        </div>
      </div>
    </>
  );
};
