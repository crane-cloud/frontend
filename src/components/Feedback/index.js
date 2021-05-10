import React from "react";
import PropTypes from "prop-types";

const Feedback = ({ type, message }) => (
  <div className={type === "success" ? "SuccessOnWhite" : "ErrorOnWhite"}>
    {message}
  </div>
);

Feedback.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Feedback;
