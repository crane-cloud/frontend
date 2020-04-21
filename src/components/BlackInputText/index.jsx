import React from 'react';
import PropTypes from 'prop-types';
import './BlackInputText.css';

const BlackInputText = ({
  onChange,
  placeholder,
  name,
  value
}) => (
  <input
    className="BlackInputText"
    type="text"
    placeholder={`${placeholder} *`}
    name={name}
    value={value}
    onChange={(e) => {
      onChange(e);
    }}
  />
);

BlackInputText.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

BlackInputText.defaultProps = {
  value: ''
};

export default BlackInputText;
