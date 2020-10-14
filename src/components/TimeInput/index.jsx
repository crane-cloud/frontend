import React, { useState } from 'react';
import './TimeInput.css';

const TimeInput = () => {
  const [ampm, setAmPm] = useState('am');
  const [hours, setHour] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const setTimeOfDay = () => {
    if (ampm === 'am') {
      setAmPm('pm');
    } else {
      setAmPm('am');
    }
  };

  const handleFocus = ({ target }) => target.select();

  const changeHour = ({ target }) => {
    setHour(target.value);
  };

  const changeMinutes = ({ target }) => {
    setMinutes(target.value);
  };

  const formatTime = (timeValue) => {
    const formattedTime = timeValue.toString();
    const timeLength = formattedTime.length;

    if (formattedTime.length < 2) {
      return `0${formattedTime}`;
    }

    if (formattedTime.length > 2) {
      return formattedTime.substring(timeLength - 2, timeLength);
    }

    return formattedTime;
  };

  return (
    <div className="TimeInputContainer">
      Time
      <div className="TimeInputWrapper">
        <input
          className="TimeInput"
          type="number"
          value={formatTime(hours)}
          onChange={changeHour}
          onFocus={handleFocus}
          min="0"
          max="12"
          maxLength="2"
        />
      &nbsp;:&nbsp;
        <input
          className="TimeInput"
          type="number"
          value={formatTime(minutes)}
          onChange={changeMinutes}
          onFocus={handleFocus}
          min="0"
          max="59"
          maxLength="2"
        />
      &nbsp;
        <input
          className="TimeInput DayNightInput"
          value={ampm}
          onFocus={handleFocus}
          onChange={setTimeOfDay}
          // onKeyDown={setTimeOfDay}
        />
      </div>
    </div>
  );
};

export default TimeInput;
