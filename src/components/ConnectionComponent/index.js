import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as ConnectionClose } from "../../assets/images/buttonCancel.svg";
import "./ConnectionComponent.css";

const ConnectionComponent = ({ handleClose, show }) => {
  const showHideClassName = show
    ? "ConnectModal DisplayBlock"
    : "ConnectModal DisplayNone";

  return (
    <div className={showHideClassName}>
      <div className="MainModalSection">
        <div>No Internet connection!</div>
        <button
          type="button"
          className="ConnectionButton"
          onClick={handleClose}
        >
          <ConnectionClose />
        </button>
      </div>
    </div>
  );
};

ConnectionComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ConnectionComponent;
