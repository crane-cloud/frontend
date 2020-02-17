import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import './Header.css';

const Header = () => (
  <header className="Header">
    <div>
      <Link to="/" className="LogoLink"><Logo /></Link>
    </div>
    <div className="HeaderLinksWrap">
      <div className="HeaderLinks bold uppercase">
        <Link to="#">pricing</Link>
        <Link to="#">docs</Link>
        <Link to="/login" className="HeaderLinkLogin">login</Link>
      </div>
    </div>
  </header>
);

export default Header;
