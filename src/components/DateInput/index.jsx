import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Calendar from "../Calendar";
import TimeInput from "../TimeInput";
import PrimaryButton from "../PrimaryButton";
import {
  monthNames,
  today,
  currentMonth,
  currentYear,
  currentHour,
  currentMinutes,
} from "../../helpers/dateConstants";
import "./DateInput.css";

const DateInput = ({
  handleChange,
  position,
  label,
  showCalendar,
  onClick,
  value,
  months_only,
  SpendCalenderClass,
  onCancel,
  onSubmit,
}) => {
  const [date, setDate] = useState({
    day: today,
    month: currentMonth,
    year: currentYear,
  });
  const [time, setTime] = useState({
    hour: currentHour,
    mins: currentMinutes,
  });

  const formatString = (num) => {
    // appends a leading 0 in case of 1-length string
    const numString = num.toString();

    if (numString.length < 2) {
      return `0${numString}`;
    }

    return numString;
  };

  const createTimestamp = useCallback(() => {
    const { year, month, day } = date;
    const { hour, mins } = time;
    const dateString = `${year}-${formatString(month + 1)}-${formatString(
      day
    )}`;
    const timeString = `${formatString(hour)}:${formatString(mins)}`;
    const timeStamp = Date.parse(`${dateString}T${timeString}`);

    if (showCalendar) {
      // only call active parent
      handleChange(timeStamp);
    }
  }, [date, time, showCalendar, handleChange]);

  const getDate = ({ day, month, year }) => {
    setDate({
      ...date,
      day,
      month,
      year,
    });
  };

  const getTime = ({ h, m }) => {
    setTime({
      ...time,
      hour: h,
      mins: m,
    });
  };

  const trimMonthName = (month) => month.substring(0, 3);

  useEffect(() => {
    createTimestamp();
  }, [createTimestamp]);

  return (
    <div className="DateInputContainer">
      <div className="DateInputWrapper">
        <div className="DateInputLabel">{label}</div>
        <div
          className={`DateInputDisplay ${showCalendar && "DisplayActive"}`}
          value={value}
          onClick={onClick}
          role="presentation"
        >
          {date
            ? `${date.year} ${!months_only ? date.day : ""}, ${trimMonthName(
                monthNames[date.month]
              )} `
            : `${currentYear} ${!months_only ? today : ""}, ${trimMonthName(
                monthNames[currentMonth]
              )}`}
        </div>
      </div>
      {showCalendar && (
        <div
          className={
            !months_only
              ? `DateInputCalendar ${position}`
              : `${SpendCalenderClass}`
          }
        >
          {!months_only && (
            <div className="TimeSection">
              <TimeInput onChange={getTime} />
            </div>
          )}
          <Calendar onChange={getDate} months_only={months_only} />
          <div className="CalendarModalButtons">
            <PrimaryButton className="CancelBtn ModalBtn" onClick={onCancel}>
              Cancel
            </PrimaryButton>
            <PrimaryButton className="ModalBtn" onClick={onSubmit}>
              Proceed
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};

DateInput.defaultProps = {
  label: "",
  position: "",
};

DateInput.propTypes = {
  label: PropTypes.string,
  position: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default DateInput;
