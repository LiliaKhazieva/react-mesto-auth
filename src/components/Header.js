import React from 'react';
import { Link } from 'react-router-dom'
import headerLogo from '../images/Vector.svg'

function Header({ title, mail, route, onClick, color }) {
  return (
    <header className="header">
      <a href="#" className="header__link"><img className="header__logo" src={headerLogo} alt="Логотип"/></a>
      <div className="header__wrapper">
        <p className="header__text">{mail}</p>
        <Link to={route} className={`header__auth ${color}`}  type="button" onClick={onClick}>{title}</Link>
      </div>
    </header>
  )
}
export default Header;