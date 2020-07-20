import React from 'react';
import './modal.css';

const Modal =({isModalOpen, closeModal, children})=>{

    return (
        <div
        className="outerStyle"
            style={{
                display: isModalOpen ? "block" : "none"
            }}
        >
            <div className="overlay" onClick={closeModal} />
            <div onClick={closeModal} />
            <div className="modal">{children}</div>
        </div>
    );
}

export default Modal;