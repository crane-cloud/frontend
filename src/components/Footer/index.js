import React from 'react';
import './Footer.css';
import LOGO from '../../helpers/img/craneLogo.png';

const Footer = () => (
  <React.Fragment>
    <footer className="footer">
      <div className="footer-inner">
        <div className="logo">
          <a href="https://cranecloud.io">
            <img
              src={LOGO}
              alt="Logo"
              className="logo-img"
            />
          </a>
        </div>

        <div className="footer-address">
          East Africa
          <br />
          +256(782)75 7010
          <br />
          COCIS Building Block B
          <br />
          Pool Road, Kampala
          <br />
          Makerere University
          <br />
          Kampala, Uganda
        </div>

        <div className="footer-address">
          Derek
          <br />
          +256(782)75 7010
          <br />
          COCIS Building Block B
          <br />
          Pool Road, Kampala
          <br />
          Makerere University
          <br />
          Kampala, Uganda
        </div>

        <div className="footer-social">
          <a
            className="social-twitter"
            href="https://twitter.com/cranecloud"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-twitter fa-3x"></i>
          </a>

          <a
            className="social-linkedin"
            href="https://www.linkedin.com/company/cranecloud"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-linkedin fa-3x"></i>
          </a>
        </div>

        <div className="footer-menu">
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
          &copy; Crane Cloud 2020 | Makerere University
        </p>
      </div>
    </footer>
  </React.Fragment>
);

export default Footer;
