import React from 'react';
import PropTypes from 'prop-types';

const ConnectionComponent = ({ handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div>No Internet connection!</div>
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};


ConnectionComponent.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ConnectionComponent;
