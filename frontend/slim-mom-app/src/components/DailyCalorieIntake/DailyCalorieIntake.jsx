import css from './DailyCalorieIntake.module.css';
import iconSvg from './../../assets/images/icons.svg';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/user/selectors';

const DailyCalorieIntake = ({ calorieIntake, onClose }) => {
  const user = useSelector(getUser);
  const foods = user.foodNotRecommended; // useSelector(getFoodNotRecommended)
  /* const calculateIntake = () => {
     //
     return 10 * currentWeight + 6.25 * height - 5 * age - 161 - 10 * (currentWeight - desiredWeight)
   }*/
  return (
      <div className={css.dailyCaloriesContent}>
        <h1>Your recommended daily calorie intake is</h1>

        <span className={css.caloriesIntake}>
          {user.dailyCalorieIntake}
          <p className={css.intake}>KCAL</p>
        </span>

        <div className={css.vector}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="330"
              height="2"
              viewBox="0 0 330 2"
              fill="none"
          >
            <use href={`${iconSvg}#vector4`}/>
          </svg>
          <h2>Foods you should not eat</h2>
        </div>
        <div>
          <ol>
            {foods.map((food, index) => (
                <li key={index}>{food}</li>
            ))}
          </ol>
        </div>
        <button className="button" onClick={onClose}>Start losing weight
        </button>

      </div>
  );
};

export default DailyCalorieIntake;
