import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css';
import LOGO from '../../assets/images/craneLogo.png';
import Linkedin from '../../assets/images/linkedin.svg';
import Facebook from '../../assets/images/facebook.svg';
import Twitter from '../../assets/images/twitter.svg';

const Footer = () => (
  <React.Fragment>
    <footer className="Footer">
      <div className="Footer-Inner">
        <div className="Logo">
          <a href="https://cranecloud.io">
            <img
              src={LOGO}
              alt="Logo"
              className="Logo-Img"
            />
          </a>
        </div>

        <div className="Footer-Address">
          East Africa
          <br />
          COCIS Building Block B
          <br />
          Pool Road, Kampala
          <br />
          Makerere University
          <br />
          Kampala, Uganda
        </div>

        <div className="Footer-Address">
          <Link to="/">Home</Link>
          <br />
          <Link to="/about">About Us</Link>
          <br />
          <Link to="/contact">Contact Us</Link>
          <br />
          <Link to="/news">News & Insights</Link>
          <br />
          <Link to="/resources">Resources</Link>
          <br />
          <Link to="/team">Team</Link>
        </div>

        <div className="Footer-Social">
          <a
            className="Social-Twitter"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Twitter}
              alt="Twitter"
              className="Social-Logos"
            />
          </a>

          <a
            className="Social-Linkedin"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Linkedin}
              alt="Linkedin"
              className="Social-Logos"
            />
            
          </a>
          <a
            className="Social-Facebook"
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Facebook}
              alt="Facebook"
              className="Social-Logos"
            />
            
          </a>
        </div>

        <div className="Footer-Menu">
          <ul id="Menu-Footer" className="Menu">
            <li
              id="menu-item-10"
              className="Menu-Item"
            >
              <a href="/terms-conditions">Terms and Conditions</a>
            </li>
            <li
              id="menu-item-11"
              className="Menu-Item"
            >
              <a href="/privacy-cookie-policy">Privacy &#038; cookie policy</a>
            </li>
            <li
              id="menu-item-13"
              className="Menu-Item"
            >
              <a href="/corporate-social-responsibility">
                Social Responsibility
              </a>
            </li>
          </ul>
        </div>

        <p className="CopyRight">
          &copy; Crane Cloud 2020 | Makerere University
        </p>
      </div>
    </footer>
  </React.Fragment>
);

export default Footer;
