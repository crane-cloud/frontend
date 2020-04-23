import React, { useState } from 'react';
import { ReactComponent as DownArrow } from '../../assets/images/down-arrow-black.svg';
import './Select.css';


const Select = ({ required, placeholder, options }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectValue, setValue] = useState(`${placeholder}${required ? ' *' : ''}`);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="SelectWrapper">
      <div className="SelectElementMain" onClick={toggleOptions} role="presentation">
        <div className={`SelectElementValue ${selectValue.startsWith(placeholder) && 'SelectElementPlaceholder'}`}>
          {selectValue}
          <div className="SelectArrow">
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
              onClick={(e) => {
                console.log(e.target.textContent)
              }}
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
