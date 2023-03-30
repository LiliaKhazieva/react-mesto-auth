import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onUpdateNewCard }) {

  const [name, setNameCard] = React.useState('')
  const [link, setLinkCard] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateNewCard({
      name,
      link,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      handleClear()
    }
  }, [isOpen]);

  function handleNameCardChange(e) {
    setNameCard(e.target.value)
  }

  function handleLinkCardChange(e) {
    setLinkCard(e.target.value)
  }

  function handleClear() {
    setNameCard('');
    setLinkCard('');
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      name="edit-place"
      buttonName="Создать"
    >
      <label className="popup__form-field">
        <input
          type="text"
          name="name"
          id="title-input"
          placeholder="Название"
          className="popup__input popup__input_type_title"
          value={name}
          onChange={handleNameCardChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__form-input-error title-input-error"></span>
      </label>
      <label className="popup__form-field">
        <input
          type="url"
          name="link"
          id="link-input"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_link"
          value={link}
          onChange={handleLinkCardChange}
          required
        />
        <span className="popup__form-input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;