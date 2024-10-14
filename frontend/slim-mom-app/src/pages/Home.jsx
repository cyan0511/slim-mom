import React, { useState, useEffect } from 'react';
import { Box } from 'components/Box';
import { H2, WrapperWtithFruits } from 'components/Home/Home.styled';
import Modal from 'components/Modal/Modal';
import { setUserGoogle, setInfoUser } from 'redux/authSlice';
import { useDispatch } from 'react-redux';
import { useUpdateGoogleUserMutation } from '../redux/auth';

export const Home = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [userParams] = useState(null);
  const dispatch = useDispatch();
  const [updateGoogleUser] = useUpdateGoogleUserMutation();

  const body = document.querySelector('body');

  const onModalClose = () => {
    setIsModalOpened(prevState => !prevState);
    body.style.overflow = 'auto';
  };

  useEffect(() => {
    const queryStr = window.location.search
      .replace('?', '')
      .split('&')
      .reduce((p, e) => {
        const [key, value] = e.split('=');
        p[decodeURIComponent(key)] = decodeURIComponent(value);
        return p;
      }, {});

    if (!queryStr.name) {
      return;
    }

    const paramsLocalStorage = JSON.parse(localStorage.getItem('params'));

    if (!queryStr.userid) {
      dispatch(setUserGoogle(queryStr));
      return;
    }

    const newUser = { ...queryStr, ...paramsLocalStorage };
    delete newUser.name;
    delete newUser.token;
    delete newUser.email;

    updateGoogleUser(newUser).unwrap();
    dispatch(setInfoUser(paramsLocalStorage));
    dispatch(setUserGoogle(queryStr));
  }, [dispatch, updateGoogleUser]);

  return (
    <WrapperWtithFruits>
      <Box maxWidth={'1280px'} m={'0 auto'}>
        {isModalOpened && (
          <Modal onClose={onModalClose} userParams={userParams} />
        )}
        <H2>Calculate your daily calorie intake right now</H2>
      </Box>
    </WrapperWtithFruits>
  );
};
