import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {logIn, register} from '../../redux/auth/authOperations';
import {useAuth} from '../../hooks/useAuth';
import css from './AuthForm.module.css';
import {NavLink} from 'react-router-dom';
import {TextField} from "../TextField/TextField";

export const AuthForm = ({
                             header,
                             fields,
                             buttonText,
                             footerText,
                             footerLink,
                             isLogin,
                         }) => {
    const {isRefreshing} = useAuth();
    const [formData, setFormData] = useState({});
    // const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const [isValid, setIsValid] = useState(null);

    // Handle Password Validation
    const validatePassword = (e, field) => {
        setMessage('');

        if (field === 'password' && !isLogin) {
            const valid = e.target.value.length >= 8;
            setIsValid(e.target.value.length === 0 ? null : valid);
            setMessage(valid ? 'Password is secure.' : 'Password must be at least 8 characters long.');
        }
    };

    const handleChange = (e, field) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        });
        validatePassword(e, field);
    };

    // Handle Submit
    const handleSubmit = async e => {
        e.preventDefault();

        try {
            if (isLogin) {
                await dispatch(logIn(formData)).unwrap();
            } else {
                await dispatch(register(formData)).unwrap();
            }
        } catch (err) {
            setIsValid(false);

            if (err.status === 409) {
                setMessage('Account already exists.');
            } else if (err.status === 403) {
                setMessage('Invalid email or password.');
            } else {
                setMessage(`${err.message || 'An error has occurred.'}`);
            }
            clearPasswordField();
        }
    };

    const clearPasswordField = () => {
        setFormData(prevData => ({
            ...prevData,
            password: '',
        }));
    };

    return (
        <div className={css.container}>
            <h1 className={css.header}>
                {header}
            </h1>
            <form onSubmit={handleSubmit} className={css.form}>
                {fields.map((field, index) => (
                    <div key={index} style={{position: 'relative'}}>
                        <TextField
                            type={field.type}
                            className={field.type === 'password' && isValid !== null ? (isValid ? css.valid : css.invalid) : ''}
                            label={field.placeholder}
                            value={formData[field.name] || ''}
                            onChange={e => handleChange(e, field.name)}
                            id={field.name}
                            required
                        />
                        {field.type === 'password' ?
                            (<>
                                <p className={css.message}
                                    style={{color: isValid ? 'var(--mint-green)' : 'var(--red)'}}
                                >
                                    {' '}
                                    {message}
                                </p>
                            </>) : null
                        }
                    </div>
                ))}


                <div className={css.actionButtons}>
                    <button
                        type="submit"
                        className="button"
                        style={{width: isRefreshing ? '170px' : null}}
                    >
                        {isRefreshing ?
                            (isLogin ? 'Signing in...' : 'Signing up...') : buttonText}
                    </button>

                    <button className="button">
                        <NavLink to={footerLink} style={{textDecoration: "none", color: "inherit"}}>
                            {footerText}
                        </NavLink>
                    </button>

                </div>
            </form>
        </div>
    );
};

