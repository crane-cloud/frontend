import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from '../Calendar';
import {
  monthNames,
  today,
  currentMonth,
  currentYear
} from '../../helpers/dateConstants';
import './DateInput.css';


const DateInput = ({ position, label }) => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [date, setDate] = useState(null);

  const getDate = (date) => setDate(date);

  return (
    <div className="DateInputContainer">
      <div className="DateInputWrapper">
        <div className="DateInputLabel">
          {label}
        </div>
        <div className="DateInputDisplay">
          {date ? (
            `${date.month}, ${date.day}, ${date.year}`
          ) : (
            `${currentMonth}, ${today}, ${currentYear}`
          )}
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
