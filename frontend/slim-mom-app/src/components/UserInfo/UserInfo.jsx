import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import icons from '../../assets/images/icons.svg';
import { logOut } from '../../redux/auth/authOperations';
import Notiflix from 'notiflix';
import css from './UserInfo.module.css';
import { getUser } from '../../redux/user/selectors';
// import Modal from '../Modal/Modal';
import clsx from 'clsx';

export const UserInfo = ({className}) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  Notiflix.Confirm.init({
    titleColor: '#9B9FAA',
    okButtonBackground: '#fc842d',
    borderRadius: '15px',
  });

  const handleLogout = () => {
    Notiflix.Confirm.show(
        'Confirm Logout',
        'Are you sure you want to logout?',
        'Yes',
        'No',
        () => {
          dispatch(logOut());
        },
    );
  };

  return (
      <div className={clsx(css.container, className)}>
        {/*<Modal isOpen children={<div>Logout</div>} />*/}
        <p className="text-nowrap">{user?.name || 'Cyan'}</p>
        <svg height={32} width={2}>
          <use href={`${icons}#short-line`}></use>
        </svg>
        <button
            className={css.exit}
            onClick={handleLogout}
        >
          Exit
        </button>
      </div>
  );
};