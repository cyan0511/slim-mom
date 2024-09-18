import React, { useState } from 'react';
import iconSvg from '../../assets/images/icons.svg';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logIn, register } from '../../redux/auth/authOperations';
import { useAuth } from '../../hooks/useAuth';
import css from './AuthForm.module.css';
import { Link } from 'react-router-dom';

export const AuthForm = ({
                           fields,
                           buttonText,
                           footerText,
                           footerLink,
                           footerLinkText,
                           isLogin,
                         }) => {
  const { isRefreshing } = useAuth();
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
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
    <form onSubmit={handleSubmit} className={css.form}>
      {fields.map((field, index) => (
        <div key={index} style={{ position: 'relative' }}>
          <input
            type={
              field.type === 'password' && showPassword
                ? 'text'
                : field.type
            }
            className={field.type === 'password' && isValid !== null ? (isValid  ? css.valid : css.invalid) : ''}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={e => handleChange(e, field.name)}
            id={field.name}
            required
          />
          {field.type === 'password' ?
            (<>
              {isLogin ?
                <svg width="20" height="20" onClick={() => setShowPassword(val => !val)}>
                  <use href={`${iconSvg}#eye${showPassword ? '' : '-off'}`} />
                </svg> :
                    isValid !==null &&
                <svg width="20" height="20" onClick={() => {
                  if (!isValid) {
                    clearPasswordField();
                    setIsValid(null);
                    setMessage('');
                  }
                }}>
                  <use href={`${iconSvg}#${isValid ? 'valid' : 'invalid'}-icon`} />
                </svg>
                }

                <p className={css.message}
                  style={{ color: isValid ? 'var(--mint-green)' : 'var(--red)' }}
                >
                  {' '}
                  {message}
                </p>
            </>) : null
          }
        </div>
      ))}


      <div className={css.actionButtons} style={!isLogin ? { marginTop: '71px' } : null}>
        <button
          type="submit"
          className="primary-button"
          style={{ width: isRefreshing ? '170px' : null }}
        >
          {isRefreshing ?
            (isLogin ? 'Signing in...' : 'Signing up...') : buttonText}
        </button>

        <p>
          {footerText}{' '}
          <Link to={footerLink}>{footerLinkText}</Link>
        </p>
      </div>
    </form>
  );
};

AuthForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    }),
  ).isRequired,
  buttonText: PropTypes.string.isRequired,
  footerText: PropTypes.string.isRequired,
  footerLink: PropTypes.string.isRequired,
  footerLinkText: PropTypes.string.isRequired,
  isLogin: PropTypes.bool.isRequired,
};
