import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as ButtonCancel } from "../../assets/images/buttonCancel.svg";
import "./CancelButton.css";

const CancelButton = ({ onClick }) => (
  <button className="CancelButton" onClick={onClick}>
    <ButtonCancel />
  </button>
);

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CancelButton;
