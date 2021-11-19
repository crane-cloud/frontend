import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Calendar from "../Calendar";
import PrimaryButton from "../PrimaryButton";
import {
  monthNames,
  today,
  currentMonth,
  currentYear,
} from "../../helpers/dateConstants";
import "./GraphInput.css";

const GraphInput = ({
  handleChange,
  position,
  label,
  showCalendar,
  onClick,
  value,
  onCancel,
  onSubmit,
}) => {
  const [date, setDate] = useState({
    day: today,
    month: currentMonth,
    year: currentYear,
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
    const dateString = `${year}-${formatString(month + 1)}-${formatString(
      day
    )}`;
    const timeStamp = Date.parse(`${dateString}`);

    if (showCalendar) {
      // only call active parent
      handleChange(timeStamp);
    }
  }, [date, showCalendar, handleChange]);

  const getDate = ({ day, month, year }) => {
    setDate({
      ...date,
      day,
      month,
      year,
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
            ? `${trimMonthName(monthNames[date.month])} ${date.day}, ${
                date.year
              }`
            : `${trimMonthName(
                monthNames[currentMonth]
              )} ${today}, ${currentYear}`}
        </div>
      </div>
      {showCalendar && (
        <div className={`DateInputCalendar ${position}`}>
          <Calendar onChange={getDate} />
          <div className="CalendarModalButtons">
            <PrimaryButton
              label="Cancel"
              className="CancelBtn ModalBtn"
              onClick={onCancel}
            />
            <PrimaryButton
              label="proceed"
              className="ModalBtn"
              onClick={onSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

GraphInput.defaultProps = {
  label: "",
  position: "",
};

GraphInput.propTypes = {
  label: PropTypes.string,
  position: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default GraphInput;
