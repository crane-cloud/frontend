import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import PROFILE from '../../assets/images/profile.svg';

const NavBar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <div className="header" dark expand="md">
        {/* <Link className="link" to="/"> */}
          <img className="logo" src={logo} alt="Crane_Cloud" />
        {/* </Link> */}
        <div style={{ color: "white" }}  />
        <div divbar>
          <div className="links ml-auto" divbar>
            <div>
              <div>
                {/* <Link to="/about">About</Link> */}
              </div>
            </div>
            <div>
              <div>
                {/* <Link to="/services">Services</Link> */}
              </div>
            </div>
            <div>
              <div>
                {/* <Link to="/learn">Learn More</Link> */}
              </div>
            </div>
            <div style={{ paddingRight: "130px" }}>
              {/* {token ? ( */}
                <li className="div-item dropdown ">
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
                  >
                    {/* <a className="dropdown-item text-reset" href="/organisation">Create Organisation</a> */}
                    {/* <a class="dropdown-item" href="#">Another action</a> */}
                    {/* <div className="dropdown-divider"></div> */}
                    <a
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
                    Sign in
                  {/* </Link> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
