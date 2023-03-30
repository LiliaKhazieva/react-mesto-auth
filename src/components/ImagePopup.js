import React from 'react';

function ImagePopup({ isOpen, card, onClose }) {
  return (
    <div className={`popup popup_type_big-image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__wrapper">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img className="popup__image" src={card ? card.link : ""} alt={card ? card.name : ""}/>
          <p className="popup__title-image">{card ? card.name : ""}</p>
      </div>
    </div>
  )
}
export default ImagePopup;