import React from 'react';

function InfoTooltip({ isOpen, onClose, image, text }) {
  return (
    <div className={`popup popup_type_tool-tip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <img className="popup__image-state" src={image} alt="Картинка"/>
        <h2 className="popup__title-state">{text}</h2>
        <button type="button"
                className="popup__close"
                onClick={onClose}>
        </button>
      </div>
    </div>
  )
}
export default InfoTooltip;