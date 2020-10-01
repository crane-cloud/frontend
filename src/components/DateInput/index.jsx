import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from '../Calendar';
import './DateInput.css';

const DateInput = ({ position, label }) => {
  const [showCalendar, setShowCalendar] = useState(true);

  const getDate = (date) => {
    console.log(date);
  };

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
          {showCalendar && <Calendar onChange={getDate} />}
        </div>
      </div>
    </div>
  );
};

DateInput.defaultProps = {
  label: '',
  position: ''
};

DateInput.propTypes = {
  label: PropTypes.string,
  position: PropTypes.string
};

export default DateInput;
