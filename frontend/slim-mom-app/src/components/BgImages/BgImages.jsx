import css from "./BgImages.module.css";
import iconSvg from "../../assets/images/icons.svg";
import strawberry from "../../assets/images/strawberry.webp";
import leaves from "../../assets/images/leaves.webp";
import banana from "../../assets/images/banana.webp";
import React from "react";
import {useLocation} from "react-router-dom";

export const BgImages = () => {
    const location = useLocation();
    const isSignInLogin = ['signup', 'login'].some(v => location.pathname.includes(v));
    return (
        <div className={css.images}>
            <svg className={css.shadow} width="553" height="750">
                <use href={`${iconSvg}#shadow`}/>
            </svg>
            <img alt="strawberry" className={css.strawberry} src={strawberry}/>
            <img alt="leaves" className={isSignInLogin ? css.leavesVertical : css.leaves} src={leaves}/>
            <img alt="banana" className={css.banana} src={banana}/>
        </div>
    );
}