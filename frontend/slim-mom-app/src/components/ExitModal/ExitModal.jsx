import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { Button } from '../Button/Button';
import './ExitModal.css';
const modalRoot = document.getElementById('modal-root');

export const ExitModal = ({ onClose, handleLogout }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 426px)' });

  const handleBackDropClick = useCallback(
    e => {
      if (e.currentTarget === e.target) {
        onClose();
      }
    },
    [onClose]
  );

  return createPortal(
    <div className="overlay" onClick={handleBackDropClick}>
      <div
        className="modal-window"
        style={
          isMobile
            ? {
                paddingTop: '30px',
                height: '90vh',
                transform: 'translate(-50%,-62%)',
              }
            : { paddingTop: '50px' }
        }
      >
        <div className="inner-info">
          <h2 style={{ textAlign: 'center', marginTop: '150px' }}>
            Are you sure you want to exit?
          </h2>
        </div>
        <div
          className="button-wrapper"
          style={
            isMobile
              ? { display: 'flex', flexWrap: 'wrap', gap: '20px' }
              : {
                  display: 'flex',
                  gap: '20px',
                  position: 'static',
                  marginTop: '100px',
                }
          }
        >
          <div onClick={handleLogout}>
            <Button>Yes</Button>
          </div>
          <div onClick={onClose}>
            <Button full={true}>No</Button>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ExitModal;
