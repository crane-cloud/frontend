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
      <section className="Navigation">
        <div className="Nav-container">
          <div className="Brand">
            <Link className="Link" to="/">
              <img className="Logo" src={logo} alt="Crane_Cloud" />
            </Link>
          </div>
          <nav>
            <div className="nav-mobile">
              <a id="nav-toggle" href="#!"><span></span></a>
            </div>
            <ul className="nav-list">
              <li><a href="#!">Home</a></li>
              <li><a href="#!">About</a></li>
              <li><a href="#!">Contact</a></li>
              <li><a href="#!">Services</a>
                <ul className="nav-dropdown">
                  <li><a href="/logout">Sign Out</a></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <div class="nav">
        <input type="checkbox" id="nav-check">
        <div class="nav-header">
          <div class="nav-title">
            JoGeek
          </div>
        </div>
        <div class="nav-btn">
          <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        
        <div class="nav-links">
          <a href="//github.io/jo_geek" target="_blank">Github</a>
          <a href="http://stackoverflow.com/users/4084003/" target="_blank">Stackoverflow</a>
          <a href="https://in.linkedin.com/in/jonesvinothjoseph" target="_blank">LinkedIn</a>
          <a href="https://codepen.io/jo_Geek/" target="_blank">Codepen</a>
          <a href="https://jsfiddle.net/user/jo_Geek/" target="_blank">JsFiddle</a>
        </div>
      </div>
      {/* <div className="Header">
        <Link className="Link" to="/">
          <img className="Logo" src={logo} alt="Crane_Cloud" />
        </Link>
        <div >
          <div className="links ml-auto">
            <div>
              <div>
                <Link to="/about">About</Link>
              </div>
            </div>
            <div>
              <div>
                {/* <Link to="/services">Services</Link> */}
              {/* </div>
            </div>
            <div>
              <div> */}
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
