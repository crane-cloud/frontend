import React from 'react';
import { Link } from "react-router-dom";
import NavLogo from '../NavLogo/index';
import PROFILE from '../../assets/images/profile.svg';
import './NavBar.css';


const namespaces = [
  {
    "name": "Cranecloud-m1",
    "resourceNumber": 7,
    "id": 1
  },
  {
    "name": "Mak-w3",
    "resourceNumber": 3,
    "id": 2
  },
  {
    "name": "AirQuality",
    "resourceNumber": 11,
    "id": 3
  },
  {
    "name": "Cocis",
    "resourceNumber": 9,
    "id": 4
  },
  {
    "name": "Level5Hub",
    "resourceNumber": 5,
    "id": 5
  },
  {
    "name": "Catalysts",
    "resourceNumber": 0,
    "id": 6
  },
  {
    "name": "Backup",
    "resourceNumber": 2,
    "id": 7
  }
]

const NavBar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <div className="Navigation">
        <input type="checkbox" id="nav-check" />
        <div className="Nav-container">
          <NavLogo />
        </div>
        <div class="Nav-Btn">
          <label for="Nav-Check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div class="Nav-Links">
          <Link to="/pricing">PRICING</Link>
          <Link to="/docs">DOCS</Link>
          {/* <div className="Logged-In">
            <div className="Nav-dropdown Drop Namespaces">
                <select>
                  <option value="">Namespaces</option>
                  {
                  namespaces.map((obj) => {
                      return <option value={obj.id}>{obj.name}</option>
                  })
                }</select>
            </div>
            <div className="Nav-dropdown Drop Profile">
              <div className="Dropdown-Icon">
                <img src={PROFILE} size="1x" alt="profile"/>
              </div>
              <div className="Dropdown-Content">
                <Link to="/logout">Sign Out</Link>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
