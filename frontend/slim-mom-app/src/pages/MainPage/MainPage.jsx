import {DailyCaloriesForm} from "../../components/DailyCaloriesForm/DailyCaloriesForm";
import css from "../../components/DailyCaloriesForm/DailyCaloriesForm.module.css";
import strawberry from "../../assets/images/strawberry.webp";
import banana from "../../assets/images/banana.webp";

const MainPage = () => {
    return (
        <div style={{position: "relative"}}>
            <DailyCaloriesForm/>
        </div>
    )
}

export default MainPage;
