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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/img/logo.png';

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
            <NavItem style={{paddingRight: "130px"}}>
              {
                token ? (
                <li className="nav-item dropdown ">
                <a className="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  
                  <FontAwesomeIcon icon={faUser} size="1x"/>
                </a>
                <div className="dropdown-menu dropdown-menu-lg-left text-muted" aria-labelledby="navbarDropdown">
                  {/* <a className="dropdown-item text-reset" href="/organisation">Create Organisation</a> */}
                  {/* <a class="dropdown-item" href="#">Another action</a> */}
                  {/* <div className="dropdown-divider"></div> */}
                  <Link className="nav-link text-reset text-center" to="/login">Sign out</Link>
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
