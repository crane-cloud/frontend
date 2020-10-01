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
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(null);

  const getDate = (date) => setDate(date);

  const trimMonthName = (month) => month.substring(0, 3);

  const displayCalendar = () => setShowCalendar(!showCalendar);

  return (
    <div className="DateInputContainer">
      <div className="DateInputWrapper" role="presentation" onClick={displayCalendar}>
        <div className="DateInputLabel">
          {label}
        </div>
        <div className="DateInputDisplay">
          {date ? (
            `${trimMonthName(monthNames[date.month])} ${date.day}, ${date.year}`
          ) : (
            `${trimMonthName(monthNames[currentMonth])} ${today}, ${currentYear}`
          )}
        </div>
        {showCalendar && (
          <div className={`DateInputCalendar ${position === 'left' && 'PositionLeft'}`}>
            <Calendar onChange={getDate} />
          </div>
        )}
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
