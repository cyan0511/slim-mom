import css from './BurgerMenu.module.css';
import { useEffect } from 'react';

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
                <button className={css['close-btn']} onClick={onClose}>X</button>
                <div className={css.menu}>
                  Test
                </div>

              </div>
            </div>
        )}
      </>
  );
};