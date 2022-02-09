import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import  "./SpendingPeriod.css";
import PrimaryButton from "../PrimaryButton";

const SpendingPeriod = (props) => {
  const current = new Date();
  const before = new Date(current.setMonth(current.getMonth() - 5));
  const todate = new Date();

  const [showModal, setShowModal] = useState(false);
  const [toTimeStamp, setToTimeStamp] =
   useState(`${todate.getFullYear()}-${("0" + (todate.getMonth() + 1)).slice(-2)}`);
  const [period,setPeriod] = useState();
  const [fromTimeStamp, setFromTimeStamp] = 
  useState(`${before.getFullYear()}-${("0" + (before.getMonth() + 1)).slice(-2)}`);

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
            <label htmlFor="start">From:</label>
               <input type="month" 
               id="From" 
               name="From"
               value={fromTimeStamp}
                onChange={ (event)=>
                  {setFromTimeStamp(event.target.value)}}
                />
                <label htmlFor="To">To:</label>
               <input type="month" 
               id="To" 
               name="To"
               value={toTimeStamp}
               onChange={ (event)=>
                {setToTimeStamp(event.target.value)}}/>   
            </div>
            <PrimaryButton
               label="Submit"
               className="Button"
               onClick={handleSubmit}
               />
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
