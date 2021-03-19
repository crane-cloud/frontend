import React from 'react';
import './LandingFooter.css';

const LandingFooter = () => (
  <footer className="LandingFooter">
    <p className="LandingFooterCopyright">
      Copyright &copy;
      {' '}
      {new Date().getFullYear()}
      {' '}
      Crane Cloud. All Rights Reserved.
    </p>
  </footer>
);

export default LandingFooter;
