import React from 'react';
import Logo from '../Logo';
import './Header.css';

const Header = () => (
  <header className="Header">
    <div>
      <Logo />
    </div>
    <div>
      <p>Services</p>
      <p>Login</p>
    </div>
  </header>
);

export default Header;
