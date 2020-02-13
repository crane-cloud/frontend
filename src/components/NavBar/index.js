import React from 'react';
import { Link } from 'react-router-dom';
import NavLogo from '../NavLogo/index';
import PROFILE from '../../assets/images/profile.svg';
import './NavBar.css';


const NavBar = () =>
// const [isOpen, setIsOpen] = useState(false);

// const toggle = () => setIsOpen(!isOpen);

  (
    <>
      <div className="Navigation">
        {/* <input type="checkbox" id="nav-check" /> */}
        <div className="NavContainer">
          <NavLogo />
        </div>
        {/* <div className="Nav-Btn">
          <label htmlFor="Nav-Check">
            <span />
            <span />
            <span />
          </label>
        </div> */}
        <div className="Nav-Links">
          {/* <Link to="/pricing">PRICING</Link>
          <Link to="/docs">DOCS</Link> */}
          <div className="Logged-In">
            <div className="DropdownIcon Showing">
              <img src={PROFILE} size="1x" alt="profile" />
            </div>
            <div className="UserProfileName">
              <div className="NameUser"><strong>Colin Wagaba</strong></div>
            </div>
            <div className="Nav-dropdown Drop Profile">

              <div className="DropdownIcon">
                <i class="arrow down"></i>
              </div>
              <div className="Dropdown-Content">
                <Link to="/logout">Sign Out</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
export default NavBar;
