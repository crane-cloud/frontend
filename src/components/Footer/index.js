import React from 'react';
import './Footer.css';
import 
const Footer = () => (
  <React.Fragment>
    <footer className="footer" role="contentinfo">
      <div className="footer--inner">
        <div className="logo">
          <a href="https://www.proximagroupafrica.com">
            <img
              src="https://www.proximagroup.com/wp-content/themes/creode/img/logo.svg"
              alt="Logo"
              className="logo-img"
            />
          </a>
        </div>

        <div className="footer__address address--secondary">
          East Africa
          <br />
          +256(782)75 7010
          <br />
          Kampala Boulevard
          <br />
          Kampala
          <br />
          Plot 298 William Street
          <br />
          Uganda
        </div>

        <div className="footer__address">
          Southern Africa
          <br />
          +27(312)281 2911
          <br />
          Suite 880, 311 S. Wacker Drive
          <br />
          East Cape, Cape Town
          <br />
          60606
          <br />
          South Africa
        </div>

        <div className="footer__social">
          <a
            className="social__twitter"
            href="https://twitter.com/proxima_group_africa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-twitter fa-3x"></i>
          </a>

          <a
            className="social__linkedin"
            href="https://www.linkedin.com/company/proxima-group_africa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-linkedin fa-3x"></i>
          </a>
        </div>

        <div className="footer__menu">
          <ul id="menu-footer" className="menu">
            <li
              id="menu-item-10"
              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-10"
            >
              <a href="/terms-conditions">Terms and Conditions</a>
            </li>
            <li
              id="menu-item-11"
              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-11"
            >
              <a href="/privacy-cookie-policy">Privacy &#038; cookie policy</a>
            </li>
            <li
              id="menu-item-13"
              className="menu-item menu-item-type-custom menu-item-object-custom menu-item-13"
            >
              <a href="/corporate-social-responsibility">
                Corporate Social Responsibility
              </a>
            </li>
          </ul>
        </div>

        <p className="copyright">
          &copy; Proxima Group Africa 2020 | Company number UG-1079619
        </p>
      </div>
    </footer>
  </React.Fragment>
);

export default Footer;
