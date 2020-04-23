import React, { useState } from 'react';
import { ReactComponent as DownArrow } from '../../assets/images/down-arrow-black.svg';
import './Select.css';

const Select = ({ required, placeholder }) => {
  const [selectValue, setValue] = useState(`${placeholder}${required ? ' *' : ''}`);

  return (
    <div className="SelectWrapper">
      <div className="SelectElementMain">
        <div className={`SelectElementValue ${selectValue.startsWith(placeholder) && 'SelectElementPlaceholder'}`}>
          {selectValue}
          <div className="SelectArrow">
            <DownArrow />
          </div>
        </div>
      </div>
      <div className="SelectOptionsWrapper">
        <div className="SelectOption">Option One</div>
        <div className="SelectOption">Option Two</div>
        <div className="SelectOption">Option Three</div>
      </div>
    </div>
  );
};

export default Select;
