import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as ButtonPlus } from "../../assets/images/buttonplus.svg";
import "./RoundAddButton.css";

const RoundAddButton = ({ onClick }) => (
  <button className="RoundAddButton" onClick={onClick}>
    <ButtonPlus />
  </button>
);

RoundAddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RoundAddButton;
