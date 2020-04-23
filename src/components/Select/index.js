import React, { useState } from 'react';
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
    onChange(selectedOption.id);
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

export default Select;
