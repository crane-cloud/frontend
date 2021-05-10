import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as NewLogoIcon } from "../../assets/images/NewLogo.svg";
import "./NewLogo.css";

const NewLogo = () => (
  <Link to="/" className="LogoWrapper">
    <div className="Logo">
      <NewLogoIcon className="NewLogoIcon" />
      <div className="BrandLogoType">Crane Cloud</div>
    </div>
  </Link>
);

export default NewLogo;
