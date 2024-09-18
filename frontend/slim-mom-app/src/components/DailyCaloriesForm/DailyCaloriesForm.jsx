import css from './DailyCaloriesForm.module.css';
export const DailyCaloriesForm = () => {
    return (
      <div className={css.container}>
          <h1>Calculate your daily calorie
              intake right now</h1>

          <form>
              <div className="input-container">
                  <input type="text" className="input-field" placeholder="Height *" />
              </div>
          </form>
      </div>
    );

}
