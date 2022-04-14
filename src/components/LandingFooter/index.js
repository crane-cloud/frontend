import React from "react";
import { Link } from "react-router-dom";
import { DOCS_URL } from "../../config";
import "./LandingFooter.css";
import NewLogo from "../NewLogo";
import { ReactComponent as TwitterIcon } from "../../assets/images/twitter.svg";
import { ReactComponent as FacebookIcon } from "../../assets/images/facebook.svg";
import { ReactComponent as LinkedinIcon } from "../../assets/images/Linkedin.svg";
import { ReactComponent as MediumIcon } from "../../assets/images/medium.svg";

const LandingFooter = () => (
  <footer className="LandingFooter">
    <div className="FooterRow">
      <div className="FooterParent">
        <div className="FooterChild1">
          <div className="FooterChildOne">
            <div className="FooterLogoName LogoBrandName">
              <NewLogo />
            </div>
            <div>
              <p className="LandingFooterCopyright LogoBrandName">
                Copyright {new Date().getFullYear()} Crane Cloud, Ltd
              </p>
              <p className="TextDivSpacing">Made in Uganda</p>
            </div>
            <div className="SocialsIcons">
              <a
                href="https://twitter.com/cranecloud_io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://www.facebook.com/CraneCloud.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://www.facebook.com/CraneCloud.io"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://medium.com/cranecloud"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MediumIcon />
              </a>
            </div>
          </div>
        </div>
        <div className="FooterChild2">
          <div className="FooterContent">
            <div className="FooterChildTwo">
              <div className="TextDivSpacing FooterLogoName">Company</div>
              <ul className="FooterList">
                <li className="TextDivSpacing">
                  <Link to="/team">Team</Link>
                </li>
                <li className="TextDivSpacing">
                  <Link to="/terms-of-service" target="_blank">Terms of service</Link>
                </li>
                <li className="TextDivSpacing">
                  <Link to="/privacy-policy" target="_blank">Privacy policy</Link>
                </li>
                {/* <li className="TextDivSpacing">
                  <Link to="/pricing">Pricing</Link>
                </li> */}
                <li className="TextDivSpacing">
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="FooterChildTwo">
              <div className="TextDivSpacing FooterLogoName">Resources</div>
              <ul className="FooterList">
                <li className="TextDivSpacing">
                  <a
                    href="https://docs.cranecloud.io/quickstart/quickstart/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Quick Start Guide
                  </a>
                </li>
                <li className="TextDivSpacing">
                  <a
                    href={`${DOCS_URL}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Docs
                  </a>
                </li>
              </ul>
            </div>
            <div className="FooterChildTwo">
              <div className="TextDivSpacing FooterLogoName">Community</div>
              <ul className="FooterList">
                <li className="TextDivSpacing">Contribute</li>
                <li className="TextDivSpacing">
                  <a
                    href="https://medium.com/cranecloud"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div className="FooterChildTwo">&nbsp;</div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default LandingFooter;
