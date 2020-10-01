import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Calendar from '../Calendar';
import './DateInput.css';

const monthNames = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const today = new Date().getDate();
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

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
