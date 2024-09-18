import css from './Logo.module.css';
import icon from '../../assets/images/logo.webp';
import iconSvg from "../../assets/images/icons.svg";
import React from "react";

export const Logo = () => (
    <div className={css.logoContainer}>
        <img src={icon} className={css.icon} alt="">
        </img>

        <svg width="105.301" height="16">
            <use href={`${iconSvg}#slim-mom`}/>
        </svg>


    </div>
);
