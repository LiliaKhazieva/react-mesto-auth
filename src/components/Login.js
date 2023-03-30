import React from 'react';
import AuthForm from './AuthForm';

function Login({ onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  return (
    <AuthForm
      title={"Вход"}
      buttonName={"Войти"}
      onSubmit={handleSubmit}
    >
      <label className="login__form-field">
        <input
          type="email"
          name="email"
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
          name="password"
          placeholder="Пароль"
          className="login__input"
          value={password}
          onChange={handlePasswordChange}
          minLength="2"
          maxLength="30"
          required
        />
      </label>
    </AuthForm>
  )
}
export default Login;