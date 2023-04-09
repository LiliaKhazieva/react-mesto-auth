import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation()

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(values.avatar);
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
      title="Обновить аватар"
      name="avatar"
      buttonName="Сохранить"
      isLoading={ isLoading }
      isDisabled={ !isValid }
    >
      <label className="popup__form-field">
        <input
          value={values.avatar || ""}
          onChange={handleChange}
          type="url"
          name="avatar"
          id="src-input"
          placeholder="Ссылка на изображение"
          className={`popup__input popup__input_type_avatar ${ errors.avatar && "popup__input_type_error" }`}
          required
        />
        <span className="popup__form-input-error popup__error_visible">{errors.avatar || ""}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;