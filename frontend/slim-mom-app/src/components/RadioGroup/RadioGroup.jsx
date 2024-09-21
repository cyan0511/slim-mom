import React from 'react';
import css from './RadioGroup.module.css';

const RadioGroup = ({options, name, value, onChange}) => {
    return (
        <div className={css.container}>
            {options.map((option, i) => (
                <div key={i}>
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={onChange}
                    />
                    <span key={option.value} className={value === option.value ? css.selected : undefined}>
                        {option.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default RadioGroup;
