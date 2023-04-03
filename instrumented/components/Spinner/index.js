import React from "react";
import PropTypes from "prop-types";
import "./Spinner.css";

const Spinner = ({ size }) => (
  <div className="SmallSpinnerWrapper">
    <div className={size === "big" ? "Spinner SpinnerBig" : "Spinner"} />
  </div>
);

Spinner.propTypes = {
  size: PropTypes.string,
};

Spinner.defaultProps = {
  size: "",
};

export default Spinner;
