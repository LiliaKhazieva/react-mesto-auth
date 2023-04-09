import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import '../index.css';
import api from '../utils/api';
import auth from '../utils/auth';
import Header from '../components/Header';
import Login from '../components/Login';
import Register from  '../components/Register';
import Main from '../components/Main';
import Footer from '../components/Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import Loading from './Loading'
import { CurrentUserContext }  from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute';
import fail from '../images/fail.svg';
import success from '../images/success.svg';

function App() {

// стейты попапов
  const [isOpenPopupAvatarEdit, setIsOpenPopupAvatarEdit] = React.useState(false);
  const [isOpenPopupProfile, setIsOpenPopupProfile] = React.useState(false);
  const [isOpenPopupAdd, setIsOpenPopupAdd] = React.useState(false);
  const [isOpenImagePopup, setIsOpenImagePopup] = React.useState(false);
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = React.useState(false);
  const [popupText, setPopupTitle] = React.useState("");
  const [imagePopup, setImage] = React.useState("");

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  // стейт карточки
  const [selectedCard, setSelectedCard] = React.useState(null);

  // стейт авторизации
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState(null);
  const [isAppLoading, setIsAppLoading] = React.useState(false);
  const [isPopupLoading, setPopupLoading] = React.useState(false);

  const navigate = useNavigate();

  function handleRegister(email, password) {
    auth.register(email, password).then(() => {
      setIsOpenInfoTooltip(true);
      setImage(success);
      setPopupTitle("Вы успешно зарегистрировались!");
      navigate("/sign-in");
    }).catch(() => {
      setImage(fail);
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
      setIsOpenInfoTooltip(true);
    })
  }

  function handleLogin(email, password) {
    auth.login(email, password).then((res) => {
      localStorage.setItem("jwt", res.token);
      setIsLoggedIn(true);
      setEmail(email);
      navigate("/");
    }).catch(() => {
      setIsOpenInfoTooltip(true);
      setImage(fail)
      setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
    })
  }

  React.useEffect(() => {
    const checkToken = localStorage.getItem("jwt");
    if (checkToken) {
      setIsAppLoading(true);
      auth.checkToken(checkToken).then((res) => {
        setIsLoggedIn(true);
        setEmail(res.data.email);
        navigate("/");
      })
        .catch((err) => {
          console.log(err);
        }).finally(() => {
        setIsAppLoading(false);
      })
    }
  }, [navigate]);

  // Карточки и данные пользователя
  React.useEffect(() => {
    api.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsOpenImagePopup(true);
  }

  //хендлер кнопки редактирования аватара
  function handleEditAvatarClick() {
    setIsOpenPopupAvatarEdit(true);
  }

  // хендлер кнопки редактирования профиля
  function handleEditProfileClick() {
    setIsOpenPopupProfile(true);
  }

  //хендлер кнопки добавления новой карточки
  function handleAddPlaceClick() {
    setIsOpenPopupAdd(true)
  }

  //хендлер закрытия всех попапов
  function closeAllPopups() {
    setIsOpenPopupAvatarEdit(false);
    setIsOpenPopupProfile(false);
    setIsOpenPopupAdd(false);
    setIsOpenImagePopup(false);
    setIsOpenInfoTooltip(false);
  }

  function handleCardLike(card) {
    // Проверяем повторно есть ли лайк на этой карточке у текущего юзера
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Запрос в API и получение данных карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) =>
            c._id === card._id ? newCard : c)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? "" : newCard
        );
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    setPopupLoading(true);
    api.saveUserInfo(userData)
      .then((user) => {
        setCurrentUser(user)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPopupLoading(false);
      })
  }

  function handleUpdateAvatar(avatar) {
    setPopupLoading(true);
    api.saveUserAvatar(avatar)
      .then((userData) => {
        setCurrentUser({...currentUser, avatar: userData.avatar})
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPopupLoading(false);
      })
  }

  function handleAddPlaceSubmit({ name, link }) {
    setPopupLoading(true);
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      setPopupLoading(false);
    })
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    setEmail(null);
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  }

  if (isAppLoading) {
    return (
      <Loading />
    )
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page_container">
            <Routes>
              <Route path="/sign-in" element={
                <>
                  <Header title="Регистрация" route="/sign-up" />
                  <Login onLogin={handleLogin} />
                </>}
              />
              <Route path="/sign-up" element={
                <>
                  <Header title="Войти" route="/sign-in" />
                  <Register onRegister={handleRegister} />
                </>}
              />
                <Route exact path="/" element={
                  <>
                    <Header color="header_color" title="Выйти" mail={email} onClick={handleSignOut} route=""/>
                    <ProtectedRoute
                      loggedIn={isLoggedIn}
                      element={Main}
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                    />
                    <Footer/>
                  </>}
                />
              <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"}/>} />
            </Routes>
            <EditAvatarPopup
              isLoading={isPopupLoading}
              isOpen={isOpenPopupAvatarEdit}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            ></EditAvatarPopup>
            <EditProfilePopup
              isLoading={isPopupLoading}
              isOpen={isOpenPopupProfile}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            ></EditProfilePopup>
            <AddPlacePopup
              isLoading={isPopupLoading}
              isOpen={isOpenPopupAdd}
              onClose={closeAllPopups}
              onUpdateNewCard={handleAddPlaceSubmit}
            >
            </AddPlacePopup>
            <ImagePopup
              isLoading={isPopupLoading}
              isOpen={isOpenImagePopup}
              card={selectedCard}
              onClose={closeAllPopups}
            />
            <InfoTooltip
              isOpen={isOpenInfoTooltip}
              onClose={closeAllPopups}
              image={imagePopup}
              text={popupText}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
  )
}

export default App;
