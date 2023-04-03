import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DateInput from "../DateInput";
import "./SpendingPeriod.css";

const SpendingPeriod = (props) => {

 const [showModal, setShowModal] = useState(false);
 const [toTimeStamp, setToTimeStamp] = useState(0);
 const [fromTimeStamp, setFromTimeStamp] = useState(0);
 const [period, setPeriod] = useState();
 const [showFromCalendar, setShowFromCalendar] = useState(true);
 const [showToCalendar, setShowToCalendar] = useState(false);
 const openModalRef = useRef(null);

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
    const from_date = new Date(fromTS)
    setFromTimeStamp(`${from_date.getFullYear()}-${from_date.getMonth()+1}`);
  };
  const handleToDate = (toTS) => {
    const to_date = new Date(toTS)
    setToTimeStamp(`${to_date.getFullYear()}-${to_date.getMonth()+1}`);
  };
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
   
    <div className="SprendPeriodContainer">
      <div className="SpendPeriodButtonsSection">
        {props.period === "months" && <>
        <div
          className={`${period === "5m" && "PeriodButtonActive"} PeriodButton`}
          name="5m"
          value="5m"
          role="presentation"
          onClick={handleChange}
        >
          5 M
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
          className={`${period === "custom" && "PeriodButtonActive"
            } PeriodButton PeriodButtonCustom`}
          name="custom"
          value="custom"
          role="presentation"
          onClick={displayCalendar}
          ref={openModalRef}
        >
          custom
        </div>
         </>}
         {props.period === "days" && <>
        <div
          className={`${period === "14d" && "PeriodButtonActive"} PeriodButton`}
          name="14d"
          value="14d"
          role="presentation"
          onClick={handleChange}
        >
          14 D
        </div>
        <div
          className={`${period === "7d" && "PeriodButtonActive"} PeriodButton`}
          name="7d"
          value="7d"
          role="presentation"
          onClick={handleChange}
        >
          7 D
        </div>
        <div
          className={`${period === "3d" && "PeriodButtonActive"} PeriodButton`}
          name="3d"
          value="3d"
          role="presentation"
          onClick={handleChange}
        >
          3 D
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
       
         </>}
        {showModal && (
          <div ref={openModalRef} className="SpendCalendarModal">
              <div className="SpendSelectDate">
                <div className="SpendDateInputSection">
              <div >from:</div>
              <DateInput
                handleChange={handleFromDate}
                showCalendar={showFromCalendar}
                SpendCalenderClass="Calenderposition"
                onClick={switchCalendars}
                months_only = {true}
                onCancel={closeCalendar}
                onSubmit={handleSubmit}
                value="from"
              />
              </div>
              <div className="SpendDateInputSection">
               <div>To:</div>
              <DateInput
                handleChange={handleToDate}
                showCalendar={showToCalendar}
                SpendCalenderClass="Calenderposition"
                months_only={true}
                onClick={switchCalendars}
                onCancel={closeCalendar}
                onSubmit={handleSubmit}
                value="to"
              />
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

SpendingPeriod.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SpendingPeriod;
