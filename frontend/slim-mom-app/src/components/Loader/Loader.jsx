import { TailSpin } from "react-loader-spinner";
import css from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <TailSpin color="#FC842D" height={100} width={100} />
    </div>
  );
};
