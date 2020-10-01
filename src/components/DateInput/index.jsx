import React, { useState, useEffect, useRef } from 'react';
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
  const dropdownRef = useRef(null);

  const getDate = (date) => setDate(date);

  const trimMonthName = (month) => month.substring(0, 3);

  const displayCalendar = () => setShowCalendar(!showCalendar);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // returned function will be called on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="DateInputContainer">
      <div className="DateInputWrapper">
        <div className="DateInputLabel">
          {label}
        </div>
        <div
          className={`DateInputDisplay ${showCalendar && 'DisplayActive'}`}
          role="presentation"
          onClick={displayCalendar}
        >
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
