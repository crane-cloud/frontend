import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import PROFILE from '../../assets/images/profile.svg';
import './NavBar.css';

const NavBar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <div className="Navigation">
        <input type="checkbox" id="nav-check" />
        <div className="Nav-container">
          <div className="Brand">
            <Link className="Link" to="/">
              <img className="Logo" src={logo} alt="Crane_Cloud" />
            </Link>
          </div>
        </div>
        <div class="Nav-Btn">
          <label for="Nav-Check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div class="Nav-Links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/services">Services</Link>
          <Link to="/login">Sign In</Link>
          {/* <div className="Nav-dropdown">
            <a href="/logout">Sign Out</a>
          </div> */}
        </div>
      </div>
                {/* <Link to="/learn">Learn More</Link> */}
              {/* </div>
            </div>
            <div style={{ paddingRight: "130px" }}> */}
              {/* {token ? ( */}
                {/* <li className="div-item dropdown ">
                  <a
                    className="div-link dropdown-toggle "
                    href="#"
                    id="divbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img icon={PROFILE} size="1x" />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-lg-left text-muted"
                    aria-labelledby="divbarDropdown"
                  > */}
                    {/* <a className="dropdown-item text-reset" href="/organisation">Create Organisation</a> */}
                    {/* <a class="dropdown-item" href="#">Another action</a> */}
                    {/* <div className="dropdown-divider"></div> */}
                    {/* <a
                      className="div-link text-reset text-center"
                      to="/login"
                    >
                      Sign out
                    </a>
                  </div>
                </li>
              ) : (
                <div>
                  {/* <Link to="/login" className="btn-sign-in"> */}
                    {/* Sign in */}
                  {/* </Link> */}
                {/* </div>
              )}
            </div>
          </div>
        </div> */}
      {/* </div>  */}
    </React.Fragment>
  );
};

export default NavBar;
