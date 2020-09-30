import React, { useState } from 'react';
import Calendar from '../Calendar';

import './DateInput.css';

const DateInput = ({ position, label }) => {
  const [showCalendar, setShowCalendar] = useState(true);

  return (
    <div className="DateInputContainer">
      <div className="DateInputWrapper">
        <div className="DateInputLabel">
          {label}
        </div>
        <div className="DateInputDisplay">
          Jul 22, 2020
        </div>
        <div className={`DateInputCalendar ${position === 'left' && 'PositionLeft'}`}>
          {showCalendar && <Calendar />}
        </div>
      </div>
    </div>
  );
};

export default DateInput;
