import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DateInput from "../DateInput";
import "./Period.css";

const Period = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [period, setPeriod] = useState("1d");
  const [showFromCalendar, setShowFromCalendar] = useState(true);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const timeNow = new Date().getTime();
  const [toTimeStamp, setToTimeStamp] = useState(timeNow);
  const [fromTimeStamp, setFromTimeStamp] = useState(
    timeNow - 24 * 60 * 60 * 1000
  );
  const openModalRef = useRef(null);

  const switchCalendars = ({ target }) => {
    const calendar = target.getAttribute("value");

    if (calendar === "from" && !showFromCalendar) {
      setShowFromCalendar(true);
      setShowToCalendar(false);
    }

    if (calendar === "to" && !showToCalendar) {
      setShowToCalendar(true);
      setShowFromCalendar(false);
    }
  };

  const displayCalendar = ({ target }) => {
    setShowModal(!showModal);
    setPeriod(target.getAttribute("value"));
  };

  const closeCalendar = () => {
    setShowModal(false);
  };

  const handleClickOutside = (event) => {
    if (openModalRef.current && !openModalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  const handleChange = ({ target }) => {
    const { onChange } = props;
    setPeriod(target.getAttribute("value"));
    onChange(target.getAttribute("value"));
  };

  const handleFromDate = (fromTS) => {
    setFromTimeStamp(fromTS);
  };

  const handleToDate = (toTS) => {
    setToTimeStamp(toTS);
  };

  const handleSubmit = () => {
    const { onChange } = props;
    const customTime = {
      start: fromTimeStamp,
      end: toTimeStamp,
    };

    onChange("custom", customTime);
    closeCalendar();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // returned function will be called on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="PeriodContainer">
      <div className="PeriodButtonsSection">
        <div
          className={`${period === "1d" && "PeriodButtonActive"} PeriodButton`}
          name="1day"
          value="1d"
          role="presentation"
          onClick={handleChange}
        >
          1d
        </div>
        <div
          className={`${period === "7d" && "PeriodButtonActive"} PeriodButton`}
          name="7days"
          value="7d"
          role="presentation"
          onClick={handleChange}
        >
          7d
        </div>
        <div
          className={`${period === "1m" && "PeriodButtonActive"} PeriodButton`}
          name="1month"
          value="1m"
          role="presentation"
          onClick={handleChange}
        >
          1m
        </div>
        <div
          className={`${period === "3m" && "PeriodButtonActive"} PeriodButton`}
          name="3months"
          value="3m"
          role="presentation"
          onClick={handleChange}
        >
          3m
        </div>
        <div
          className={`${period === "1y" && "PeriodButtonActive"} PeriodButton`}
          name="1year"
          value="1y"
          role="presentation"
          onClick={handleChange}
        >
          1y
        </div>
        <div
          className={`${period === "all" && "PeriodButtonActive"} PeriodButton`}
          name="all"
          value="all"
          role="presentation"
          onClick={handleChange}
        >
          all
        </div>
        <div
          className={`${
            period === "custom" && "PeriodButtonActive"
          } PeriodButton PeriodButtonCustom`}
          name="custom"
          value="custom"
          role="presentation"
          onClick={displayCalendar}
          ref={openModalRef}
        >
          custom
        </div>
        {showModal && (
          <div ref={openModalRef} className="CalendarModal">
            <div className="DateInputsSection">
              <DateInput
                label="From"
                position="from"
                handleChange={handleFromDate}
                showCalendar={showFromCalendar}
                onClick={switchCalendars}
                onCancel={closeCalendar}
                onSubmit={handleSubmit}
                value="from"
              />
              <DateInput
                label="To"
                position="to"
                handleChange={handleToDate}
                showCalendar={showToCalendar}
                onClick={switchCalendars}
                onCancel={closeCalendar}
                onSubmit={handleSubmit}
                value="to"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
Period.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Period;
