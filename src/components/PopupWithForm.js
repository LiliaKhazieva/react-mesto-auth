import React from 'react';
import '../index.css'

function PopupWithForm({ isOpen, onClose, name, title, children, buttonName, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button"
                className="popup__close"
                onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form name={name}
              className="popup__form"
              onSubmit={onSubmit}>
          {children}
          <button type="submit"
                  className="popup__form-button">{buttonName}</button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;