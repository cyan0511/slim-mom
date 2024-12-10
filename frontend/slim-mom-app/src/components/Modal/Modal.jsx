import React, { useEffect } from 'react';
import css from './Modal.module.css';
import iconSvg from "../../assets/images/icons.svg";

const Modal = ({ isOpen, onClose, children }) => {
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
        <div className={css.modalOverlay} onClick={handleBackdropClick}>
            <div className={css.modalContainer}>
                <div className={css.actionContainer}>
                    <svg  width="12" height="7" onClick={onClose}>
                        <use href={`${iconSvg}#return`}/>
                    </svg>
                    <button className={css.modalCloseButton} onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className={css.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
