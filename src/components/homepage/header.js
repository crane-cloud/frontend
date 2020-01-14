import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import logo from '../../assets/img/logo.png';
import user_icon from '../../assets/img/user-circle.svg';

const token = sessionStorage.getItem('creds');

const HeaderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className='header' dark expand="md">
        <Link className='link' to='/'><img className='logo' src={logo} alt="Crane_Cloud" /></Link>
        <NavbarToggler style={{ color: 'white' }} onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="links ml-auto" navbar>
            <NavItem>
              <NavLink><Link to="/about">About</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/services">Services</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/learn">Learn More</Link></NavLink>
            </NavItem>
            <NavItem>
              {
                token ? (
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img className="user-icon" src={user_icon} alt="user_profile" />
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Something else here</a>
                </div>
              </li>) : (<NavLink><Link to="/login" className="btn-sign-in">Sign in</Link></NavLink>)
              }
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default HeaderComponent;
