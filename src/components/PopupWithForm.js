import React from 'react';
import '../index.css'

function PopupWithForm({ isOpen, onClose, name, title, children, buttonName, onSubmit, isLoading, isDisabled = false }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button"
                className="popup__close"
                onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        <form name={name}
              className="popup__form"
              onSubmit={onSubmit}
              noValidate>
          { children }
          <button type="submit"
                  disabled={isDisabled}
                  className={`popup__form-button ${ isDisabled && "popup__form-button_disabled" }` }
                  >{ isLoading ? "Сохранение..." : buttonName }</button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;