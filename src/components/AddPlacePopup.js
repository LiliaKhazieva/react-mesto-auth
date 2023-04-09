import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function AddPlacePopup({ isOpen, onClose, onUpdateNewCard, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation()

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateNewCard(values);
  }

  React.useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      name="edit-place"
      buttonName="Создать"
      isLoading={ isLoading }
      isDisabled={!isValid}
    >
      <label className="popup__form-field">
        <input
          type="text"
          name="name"
          id="title-input"
          placeholder="Название"
          className={`popup__input popup__input_type_name ${ errors.link && "popup__input_type_error" }`}
          value={values.name || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__form-input-error">{errors.name || ""}</span>
      </label>
      <label className="popup__form-field">
        <input
          type="url"
          name="link"
          id="link-input"
          placeholder="Ссылка на картинку"
          className={`popup__input popup__input_type_link ${ errors.link && "popup__input_type_error" }`}
          value={values.link || ""}
          onChange={handleChange}
          required
        />
        <span className="popup__form-input-error">{errors.link || ""}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;