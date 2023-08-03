import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoIcon } from "../../assets/images/logo.svg";
import "./Logo.css";

const Logo = () => {
  const path = window.location.pathname;
  const pathsWithoutMenu = ['/','/projects','/profile','/activity']
  return (
    <Link to="/" className={`${ pathsWithoutMenu.includes(path) ? 
    'homeLogoWrapper' : 'LogoWrapper'}`}>
      <div className="Logo">
        <LogoIcon className="LogoIcon" />
        <div className="LogoType">Crane Cloud</div>
      </div>
    </Link>
  );
};

export default Logo;
