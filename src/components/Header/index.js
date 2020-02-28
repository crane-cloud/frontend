import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import './Header.css';

const Header = () => (
  <header className="Header">
    <div>
      <Logo />
    </div>
    <div className="HeaderLinksWrap">
      <div className="HeaderLinks bold uppercase">
        <Link to="#" className="HeaderLinkPricing">pricing</Link>
        <Link to="#" className="HeaderLinkDocs">docs</Link>
        <Link to="/login" className="HeaderLinkLogin">login</Link>
      </div>
    </div>
  </header>
);

export default Header;
