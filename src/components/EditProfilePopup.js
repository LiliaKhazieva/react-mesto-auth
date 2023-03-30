import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup ({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState({});
  const [description, setDescription] = React.useState({});

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser]);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Редактировать профиль"
      name="edit-profile"
      buttonName="Сохранить"
    >
      <label className="popup__form-field">
        <input
          type="text"
          name="name"
          id="name-input"
          placeholder="Введите имя"
          className="popup__input popup__input_type_name"
          value={name}
          onChange={handleNameChange}
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__form-input-error name-input-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          type="text"
          name="job"
          id="job-input"
          placeholder="Введите описание"
          className="popup__input popup__input_type_info"
          value={description}
          onChange={handleDescriptionChange}
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__form-input-error job-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;