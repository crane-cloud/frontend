import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as DownArrow } from '../../assets/images/down-arrow-black.svg';
import './Select.css';


const Select = ({
  required,
  placeholder,
  options,
  onChange
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setValue] = useState(`${placeholder}${required ? ' *' : ''}`);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleChange = (selectedOption) => {
    setValue(selectedOption.name);
    toggleOptions();
    onChange(selectedOption);
  };

  return (
    <div className="SelectWrapper">
      <div className="SelectElementMain" onClick={toggleOptions} role="presentation">
        <div className={`SelectElementValue ${selected.startsWith(placeholder) && 'SelectElementPlaceholder'}`}>
          {selected}
          <div className={`SelectArrow ${showOptions && 'SelectArrowShowOptions'}`}>
            <DownArrow />
          </div>
        </div>
      </div>
      {showOptions && (
        <div className="SelectOptionsWrapper">
          {options.map((option) => (
            <div
              key={option.id}
              className="SelectOption"
              onClick={() => handleChange(option)}
              role="presentation"
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Select.propTypes = {
  required: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired
};

Select.defaultProps = {
  required: false
};

export default Select;
