import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar }) {

  const avatarRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    if (isOpen) {
    avatarRef.current.value = '';
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Обновить аватар"
      name="edit-avatar"
      buttonName="Сохранить"
    >
      <label className="popup__form-field">
        <input
          ref={avatarRef}
          type="url"
          name="link"
          id="src-input"
          placeholder="Ссылка на изображение"
          className="popup__input popup__input_type_link"
          required
        />
        <span className="popup__form-input-error src-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;