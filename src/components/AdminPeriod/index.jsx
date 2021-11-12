import React, { useState } from "react";
import PropTypes from "prop-types";
import "./AdminPeriod.css";

const AdminPeriod = (props) => {
  const [period, setPeriod] = useState("all");

  const handleChange = ({ target }) => {
    const { onChange } = props;
    setPeriod(target.getAttribute("value"));
    onChange(target.getAttribute("value"));
  };
  return (
    <div className="PeriodContainer">
      <div className="PeriodButtonsSection">
        <div
          className={`${period === "3m" && "PeriodButtonActive"} PeriodButton`}
          name="3month"
          value="3m"
          role="presentation"
          onClick={handleChange}
        >
          3m
        </div>
        <div
          className={`${period === "4m" && "PeriodButtonActive"} PeriodButton`}
          name="4months"
          value="4m"
          role="presentation"
          onClick={handleChange}
        >
          4m
        </div>
        <div
          className={`${period === "8m" && "PeriodButtonActive"} PeriodButton`}
          name="8months"
          value="8m"
          role="presentation"
          onClick={handleChange}
        >
          8m
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
          className={`${period === "2y" && "PeriodButtonActive"} PeriodButton`}
          name="2year"
          value="2y"
          role="presentation"
          onClick={handleChange}
        >
          2y
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
      </div>
    </div>
  );
};

AdminPeriod.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default AdminPeriod;
