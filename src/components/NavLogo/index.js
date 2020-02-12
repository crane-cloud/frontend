import React from "react";
import { Link } from "react-router-dom";
import "./NavLogo.css";
import logo from "../../assets/images/logo.png";

const NavLogo = () => (
  <>
    <div className="Brand">
      <Link className="Link" to="/">
        <img className="Logo" src={logo} alt="Crane_Cloud" />
      </Link>
    </div>
  </>
);

export default NavLogo;
