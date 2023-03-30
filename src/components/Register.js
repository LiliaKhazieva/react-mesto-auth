import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  return (
    <AuthForm
      title={"Регистрация"}
      buttonName={"Зарегистрироваться"}
      onSubmit={handleSubmit}
    >
      <label className="login__form-field">
        <input
          type="email"
          placeholder="Email"
          className="login__input"
          value={email}
          onChange={handleEmailChange}
          minLength="2"
          maxLength="30"
          required
        />
      </label>
      <label className="login__form-field">
        <input
          type="password"
          placeholder="Пароль"
          className="login__input"
          value={password}
          onChange={handlePasswordChange}
          minLength="2"
          maxLength="30"
          required
        />
      </label>
      <Link to="/sign-in" className="login__button" type="button">Уже зарегистрированы? Войти</Link>
    </AuthForm>

  )
}
export default Register;