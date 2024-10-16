import css from './TextField.module.css';
import clsx from 'clsx';

export const TextField = ({label, id, className, type, onChange, value}) => {
    return (
        <div className={clsx(css.inputContainer, className)}>
            <input onChange={onChange} value={value} type={type} className={css.textField} id={id} placeholder=" " required/>
            <label className={css.label} htmlFor={id}>{label}</label>
            {label && <span className={css.highlight}></span>}
        </div>
    )
};
