import React from 'react';
import Logo from '../Logo';
import './Header.css';

const Header = () => (
  <header className="Header">
    <div>
      <Logo />
    </div>
    <div className="HeaderLinksWrap">
      <div className="HeaderLinks bold uppercase">
        <a href="#">pricing</a>
        <a href="#">docs</a>
        <a href="#" className="HeaderLinkLogin">login</a>
      </div>
    </div>
  </header>
);

export default Header;
