import { useSelector } from 'react-redux';
import styles from '../RightSideBar/RightSideBar.module.css';
import leaves from '../../assets/images/leaves.webp';
import React from 'react';
import { getUser } from '../../redux/user/selectors';
import { getDiaries } from '../../redux/diaries/selectors';
import { format } from 'date-fns';

export const RightSideBar = ({ date }) => {
  const user = useSelector(getUser);
  const notAllowedFoods = user?.foodNotRecommended || [];

  const formattedDate = date ? format(date, 'dd.MM.yyyy') : '';
  const dailyRate = user.dailyCalorieIntake;

  const diaries = useSelector(getDiaries) || [];
  const totalCalories = diaries.reduce((prev, diary) => {
    return Number.parseInt(prev) + diary.calories;
  }, 0);
  const leftCalories = (dailyRate || 0 - totalCalories).toFixed(2);
  const nOfNorm = (totalCalories / dailyRate) * 100;

  return (
      <div className={styles.wrapper}>
        <div className={styles.summaryWrap}>
          <h3 className={styles.title}>Summary for {formattedDate}</h3>
          <ul>
            <li className={styles.item}>
              <p className={styles.text}>Left</p>
              {leftCalories < 0 ? (
                  <p className={styles.redText}>{leftCalories} kcal</p>
              ) : (
                  <p className={styles.text}>
                    {leftCalories ? leftCalories : '000'} kcal
                  </p>
              )}
            </li>
            <li className={styles.item}>
              <p className={styles.text}>Consumed</p>
              <p className={styles.text}>
                {totalCalories ? totalCalories : '000'} kcal
              </p>
            </li>
            <li className={styles.item}>
              <p className={styles.text}>Daily rate</p>
              <p className={styles.text}>{dailyRate
                  ? dailyRate
                  : '000'} kcal</p>
            </li>
            <li className={styles.item}>
              <p className={styles.text}>n% of normal</p>
              {nOfNorm > 100 ? (
                  <p className={styles.redText}>
                    {nOfNorm ? Math.round(nOfNorm) : '0'} %
                  </p>
              ) : (
                  <p className={styles.text}>
                    {nOfNorm ? Math.round(nOfNorm) : '0'} %
                  </p>
              )}
            </li>
          </ul>
        </div>
        <div className={styles.foodWrap}>
          <h3 className={styles.title}>Food not recommended</h3>
          {notAllowedFoods ? (
              <ul>
                {notAllowedFoods.map((prod, index) => (
                    <p className={styles.text} key={index}>
                      {prod}
                    </p>
                ))}
              </ul>
          ) : (
              <p className={styles.text}>Your diet will be displayed here</p>
          )}
        </div>

        <div className={styles.image}>
          <img alt="leaves" className={styles.leaves} src={leaves}/>
        </div>
      </div>
  );
};
