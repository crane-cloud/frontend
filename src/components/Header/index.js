import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import ProfileIcon from '../../assets/images/profile.svg';
import DownArrow from '../../assets/images/downarrow.svg';
import './Header.css';

const Header = () => (
  <header className="Header">
    <div className="LogoWrap">
      <Logo />
    </div>
    <div className="HeaderLinksWrap">
      <div className="HeaderLinks bold uppercase">
        <Link to="#" className="HeaderLinkPricing">pricing</Link>
        <Link to="#" className="HeaderLinkDocs">docs</Link>
        <Link to="/login" className="HeaderLinkLogin">login</Link>
      </div>
    </div>
    <div className="HeaderLinksWrap LoggedIn">
      <div className="ProfileIconWrap">
        <img src={ProfileIcon} alt="profile" />
      </div>

      <div className="UserNames">
        Steve&nbsp;Araka
      </div>

      <div className="DropDownArrow">
        <img src={DownArrow} alt="down_arrow" />
      </div>
    </div>
  </header>
);

export default Header;
