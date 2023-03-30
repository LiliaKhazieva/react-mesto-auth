import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  // Проверяем наша ли карточка
  const isOwn = card.owner._id === currentUser._id;
  // Проверяем есть ли лайк на этой карточке у текущего юзера
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Переменные для корзины и лайка
  const cardLikeButtonClassName = (
    `elements__like-button ${isLiked && 'elements__like-button_active'}`
  );
  const cardDeleteButtonClassName = (
    `elements__delete-button ${isOwn && 'elements__delete-button_show'}`
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLikeClick() {
    onCardLike(card);
  }

  function handleCardDeleteClick() {
    onCardDelete(card);
  }

  return (
      <li className="elements__item">
        <img src={card.link}
             alt={card.name}
             onClick={handleCardClick}
             className="elements__image"/>
        <button type="button"
                className={cardDeleteButtonClassName}
                onClick={handleCardDeleteClick}>
        </button>
          <div className="elements__wrapper">
            <h2 className="elements__title">{card.name}</h2>
            <div className="elements__wrapper-like">
              <button type="button"
                      className={cardLikeButtonClassName}
                      onClick={handleCardLikeClick}></button>
              <span className="elements__count">{card.likes.length}</span>
            </div>
          </div>
      </li>
  )
}
export default Card;