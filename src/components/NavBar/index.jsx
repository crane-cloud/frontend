import React from 'react';
import { Link } from 'react-router-dom';
import NavLogo from '../NavLogo/index';
import PROFILE from '../../assets/images/profile.svg';
import DOWN from '../../assets/images/downarrow.svg';
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
        <div className="NavLinks">
          {/* <Link to="/pricing">PRICING</Link>
          <Link to="/docs">DOCS</Link> */}
          <div className="LoggedIn">
            <div className="DropdownIcon Showing">
              <img src={PROFILE} size="1x" alt="profile" />
            </div>
            <div className="UserProfileName">
              <div className="NameUser"><strong>Colin Wagaba</strong></div>
            </div>
            <div className="NavDropdown Drop Profile">

              <div className="DropdownIcon">
                <img src={DOWN} size="1x" className='DownIcon' alt="DOWN"/>
              </div>
              <div className="DropdownContent">
                <Link to="/logout">Sign Out</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
export default NavBar;
