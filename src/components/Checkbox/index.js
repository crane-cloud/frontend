import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';
import { ReactComponent as WhiteCheckmark } from '../../assets/images/white-check-mark.svg';
import { ReactComponent as BlackCheckmark } from '../../assets/images/black-check-mark.svg';

const Checkbox = ({ isChecked, onClick, isBlack }) => (
  <div className="Checkbox">
    <input
      type="checkbox"
      onChange={onClick}
      checked={isChecked}
    />
    <div className={`CheckMarkWrapper Checked-${isChecked} ${isBlack && 'CheckMarkWrapperBlack'}`}>
      {isBlack ? <BlackCheckmark /> : <WhiteCheckmark />}
    </div>
  </div>
);

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  isBlack: PropTypes.bool
};

Checkbox.defaultProps = {
  isBlack: false
};

export default Checkbox;
