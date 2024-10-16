import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { useLogOutUserMutation } from 'redux/auth';
import { logOut } from '../../redux/auth/authOperations';

import ExitModal from '../ExitModal/ExitModal';
import './UserInfo.css';

export const BottomSection = ({ user }) => {
  const body = document.querySelector('body');

  const [isModalOpened, setIsModalOpened] = useState(false);

  const onModalClose = () => {
    setIsModalOpened(!isModalOpened);
    body.style.overflow = 'auto';
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //  const [logOutUser] = useLogOutUserMutation();

  const handleLogout = () => {
    //   logOutUser();
    dispatch(logOut());
    navigate('/');
  };

  return (
    <div className="section">
      {isModalOpened && (
        <ExitModal onClose={onModalClose} handleLogout={handleLogout} />
      )}
      <button className="name">{user}</button>
      <button className="exit" onClick={() => setIsModalOpened(!isModalOpened)}>
        Exit
      </button>
    </div>
  );
};

export default BottomSection;
