import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({
                onEditAvatar,
                onEditProfile,
                onAddPlace,
                onCardClick,
                onCardLike,
                onCardDelete,
                cards,
              }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>
            <button className="profile__avatar-edit" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => {
            return(
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          })}
        </ul>
      </section>
    </main>
  );
}
export default Main;