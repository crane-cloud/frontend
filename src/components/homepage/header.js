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
              <NavLink><Link to="/login" className="btn-sign-in">Sign In</Link></NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default HeaderComponent;
