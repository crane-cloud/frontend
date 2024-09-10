import React from "react";
import PropTypes from "prop-types";

const Feedback = ({ type, message, onClose }) => {
  return (
    <div className="FeedbackSection">
      <div className={type === "success" ? "SuccessOnWhite" : "ErrorWhite"}>
        <span>{message}</span>
        <button onClick={onClose} className="closeButton">
          x
        </button>
      </div>
    </div>
  );
};

Feedback.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Feedback;
