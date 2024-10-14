import css from './DailyCalorieIntake.module.css';
import PropTypes from 'prop-types';

const foods = [
  { name: 'Apple', calories: 95 },
  { name: 'Banana', calories: 105 },
  { name: 'Carrot', calories: 45 },
  { name: 'Donut', calories: 240 },
  { name: 'Egg', calories: 70 },
];

const DailyCalorieIntake = ({ intake }) => {
  return (
    <div className={css.dailyCaloriesContent}>
      <h2>Your recommended daily calorie intake is</h2>
      <span>{intake} GRAMS</span>
      <p>Foods you should not eat</p>

      <ol className={css.modalContent}>
        {foods.map((food, index) => (
          <li className={css.orderList} key={index}>
            {food.name}
          </li>
        ))}
      </ol>

      <div>
        <button type="submit">Start losing weight</button>
      </div>
    </div>
  );
};
DailyCalorieIntake.propTypes = {
  intake: PropTypes.number.isRequired,
};
export default DailyCalorieIntake;
