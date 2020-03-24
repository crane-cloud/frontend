import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';
import { ReactComponent as Checkmark } from '../../assets/images/check.svg';

const Checkbox = ({ isChecked, onClick }) => (
  <div className="Checkbox">
    <input
      type="checkbox"
      onChange={onClick}
      checked={isChecked}
    />
    <div className={`CheckMarkWrapper Checked-${isChecked}`}>
      <Checkmark />
    </div>
  </div>
);

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Checkbox;
