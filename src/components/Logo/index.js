import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoIcon } from '../../assets/images/secondary-logo-inverted.svg';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/">
      <LogoIcon className="HeaderLogo" />
    </Link>
  );
};

export default Logo;
