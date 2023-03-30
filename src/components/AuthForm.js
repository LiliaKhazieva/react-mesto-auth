import React from 'react';

function AuthForm({ onInfoTooltip, onSubmit, children, name, title, buttonName}) {

  return (
    <section className="login">
      <h2 className="login__title">{title}</h2>
      <form name={name} className="login__form" onSubmit={onSubmit}>
        {children[0]}
        {children[1]}
        <button type="submit" className="login__form-button" onClick={onInfoTooltip}>
          {buttonName}
        </button>
      </form>
      {children[2]}
    </section>
  )
}
export default AuthForm;