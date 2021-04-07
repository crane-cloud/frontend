import React from 'react';
import { Link } from 'react-router-dom';
import { DOCS_URL } from '../../config';
import './LandingFooter.css';
import { ReactComponent as TwitterIcon } from '../../assets/images/twitter.svg';
import { ReactComponent as FacebookIcon } from '../../assets/images/facebook.svg';

const LandingFooter = () => (
  <footer className="LandingFooter">
    <div className="FooterRow">
      <div className="FooterParent">
        <div className="FooterChildOne">
          <div className="">
            <h5 className="FooterLogoName LogoBrandName CenteredDiv">Crane Cloud</h5>
          </div>
          <div></div>
          <div>
            <p className="LandingFooterCopyright LogoBrandName">
              Copyright {new Date().getFullYear()} Crane Cloud, Ltd.
            </p>
            <p className="CountryOfOrigin">
              Made in Uganda.
            </p>
            <div className="SocialsIcons">
              <a href="https://twitter.com/cranecloud_io" target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
              </a>
              <a href="https://www.facebook.com/CraneCloud.io" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
              </a>
            </div>
          </div>
          <div></div>
        </div>
        <div className="FooterChildTwo">
          <h5 className="CountryOfOrigin FooterLogoName">Company</h5>
          <ul className="FooterList">
            <li className="CountryOfOrigin">
              <Link to="/team">Team</Link>
            </li>
            <li className="CountryOfOrigin">Terms and Privacy</li>
          </ul>
        </div>
        <div className="FooterChildTwo">
          <h5 className="CountryOfOrigin FooterLogoName">Resources</h5>
          <ul className="FooterList">
            <li className="CountryOfOrigin">
              <a href="https://docs.cranecloud.io/quickstart/quickstart/" rel="noopener noreferrer" target="_blank">Quick Start Guide</a>
            </li>
            <li className="CountryOfOrigin">
              <a href={`${DOCS_URL}`} rel="noopener noreferrer" target="_blank">Docs</a>
            </li>
          </ul>
        </div>
        <div className="FooterChildTwo">
          <h5 className="CountryOfOrigin FooterLogoName">Community</h5>
          <ul className="FooterList">
            <li className="CountryOfOrigin">Contribute</li>
            <li className="CountryOfOrigin">
              <a href="https://medium.com/cranecloud" rel="noopener noreferrer" target="_blank">Blog</a>
            </li>
          </ul>
        </div>
        <div className="FooterChildTwo">
          
        </div>
      </div>
    </div>
    
  </footer>
);

export default LandingFooter;
