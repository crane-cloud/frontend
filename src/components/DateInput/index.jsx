import React, {
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import Calendar from '../Calendar';
import TimeInput from '../TimeInput';
import {
  monthNames,
  today,
  currentMonth,
  currentYear,
  currentHour,
  currentMinutes
} from '../../helpers/dateConstants';
import './DateInput.css';

const DateInput = ({ handleChange, position, label }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const dropdownRef = useRef(null);
  const [date, setDate] = useState({
    day: today,
    month: currentMonth,
    year: currentYear
  });
  const [time, setTime] = useState({
    hour: currentHour,
    mins: currentMinutes
  });

  const formatString = (num) => { // appends a leading 0 in case of 1-length string
    const numString = num.toString();

    if (numString.length < 2) {
      return `0${numString}`;
    }

    return numString;
  };

  const createTimestamp = useCallback(() => {
    const { year, month, day } = date;
    const { hour, mins } = time;
    const dateString = `${year}-${formatString(month + 1)}-${formatString(day)}`;
    const timeString = `${formatString(hour)}:${formatString(mins)}`;
    const timeStamp = Date.parse(`${dateString}T${timeString}`);

    handleChange(timeStamp);
  }, [date, time, handleChange]);

  const getDate = ({ day, month, year }) => {
    setDate({
      ...date,
      day,
      month,
      year
    });
  };

  const getTime = ({ h, m }) => {
    setTime({
      ...time,
      hour: h,
      mins: m
    });
  };

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

  useEffect(() => {
    createTimestamp();
  }, [createTimestamp]);

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
            <div className="TimeSection">
              <TimeInput onChange={getTime} />
            </div>
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
  position: PropTypes.string,
  handleChange: PropTypes.func.isRequired
};

export default DateInput;
