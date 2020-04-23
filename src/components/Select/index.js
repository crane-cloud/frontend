import React, { useState } from 'react';
import './Select.css';

const Select = ({ required, placeholder }) => {
  const [selectValue, setValue] = useState(`${placeholder}${required ? ' *' : ''}`);

  return (
    <div className="SelectWrapper">
      <div className="SelectElementMain">
        <div className={`SelectElementValue ${selectValue.startsWith(placeholder) && 'SelectElementPlaceholder'}`}>
          {selectValue}
        </div>
      </div>
      <div className="SelectOptionsWrapper"></div>
    </div>
  );
};

export default Select;
