import css from './DailyCalorieIntake.module.css';
import PropTypes from 'prop-types';
import iconSvg from '../../../assets/images/icons.svg';

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
      <h1>Your recommended daily calorie intake is</h1>
      <div>
        <span className={css.caloriesIntake}>
          {intake}
          <p className={css.intake}>CALORIES</p>
        </span>
      </div>
      <div className={css.vector}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="330"
          height="2"
          viewBox="0 0 330 2"
          fill="none"
        >
          <use href={`${iconSvg}#vector4`} />
        </svg>
        <h2>Foods you should not eat</h2>
      </div>
      <div>
        <ol>
          {foods.map((food, index) => (
            <li key={index}>{food.name}</li>
          ))}
        </ol>
      </div>

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
