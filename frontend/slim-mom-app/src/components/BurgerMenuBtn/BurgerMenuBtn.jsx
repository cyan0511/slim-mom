import icons from '../../assets/images/icons.svg';
import React, { useState } from 'react';
import css from './BurgerMenuBtn.module.css';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

export const BurgerMenuBtn = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
      <div className={className}>
        <BurgerMenu isOpen={isOpen} onClose={closeModal} onOpen={openModal}/>

        {!isOpen &&
            <svg className={css.menu} width="24" height="24"
                onClick={openModal}>
              <use href={`${icons}#menu`}/>
            </svg>}

        {isOpen &&
            <button className={css.modalCloseButton} onClick={closeModal}>
              &times;
            </button>}

      </div>
  );
};