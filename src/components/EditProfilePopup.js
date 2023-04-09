import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

function EditProfilePopup ({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, setValues, setIsValid, handleChange, errors, isValid, resetForm } = useFormAndValidation()

  React.useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      })
      setIsValid(true)
    }
  }, [isOpen, currentUser, setValues, setIsValid]);

  React.useEffect(() => {
      resetForm({
        name: currentUser.name,
        about: currentUser.about,
      })
      setIsValid(true)
  }, [resetForm, setIsValid, currentUser.name, currentUser.about]);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="edit-profile"
      buttonName="Сохранить"
      isLoading={ isLoading }
      isDisabled={!isValid}
    >
      <label className="popup__form-field">
        <input
          type="text"
          name="name"
          id="name-input"
          placeholder="Введите имя"
          className={`popup__input popup__input_type_name ${ errors.name && "popup__input_type_error" }`}
          value={ values.name || "" }
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__form-input-error">{errors.name || ""}</span>
      </label>
      <label className="popup__form-field">
        <input
          type="text"
          name="about"
          id="job-input"
          placeholder="Введите описание"
          className={`popup__input popup__input_type_about ${ errors.about && "popup__input_type_error" }`}
          value={ values.about || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__form-input-error">{errors.about || ""}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;