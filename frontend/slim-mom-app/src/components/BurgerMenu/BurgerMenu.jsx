import css from './BurgerMenu.module.css';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const BurgerMenu = ({ isOpen, onOpen, onClose }) => {
  // Function to handle keydown event
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  if (!isOpen) return null;

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
      <>
        {isOpen && (
            <div className={css['modal-overlay']} onClick={handleBackdropClick}>
              <div className={css['modal-content']}>
                <div className={css.menu}>
                  <NavLink onClick={onClose}
                      to="/diary"
                      className={({ isActive }) => isActive ? css.active : ''}
                  >
                    Diary
                  </NavLink>
                  <NavLink onClick={onClose}
                      to="/calculator"
                      className={({ isActive }) => isActive ? css.active : ''}
                  >
                    Calculator
                  </NavLink>

                </div>

              </div>
            </div>
        )}
      </>
  );
};