
import React from "react";
import RoundAddButton from "../RoundAddButton";
import AppStatus from "../AppStatus";
import PrimaryButton from "../PrimaryButton";
import "./InformationBar.css";

const InformationBar = ({ header, status, showBtn, btnAction, viewAppLink }) => (
  <div className="InformationBar">
    {status ? (
      <div className="InformationBarWithButton">
        <div className="AppUrl">
          <a target="_blank" rel="noopener noreferrer" href={header}>
            {header}
          </a>
        </div>
        <div className="RoundAddButtonWrap">
          <AppStatus appStatus={status} />
        </div>
      </div>
    ) : showBtn ? (
      <div className="InformationBarWithButton">
        <div className="InfoHeader">{header}</div>
        <div className="RoundAddButtonWrap">
          <RoundAddButton onClick={btnAction} />
        </div>
      </div>
    ) : viewAppLink ? (
        <div className="InformationBarWithButton">
        <div className="InfoHeader">{header}</div>
      <a
       href={viewAppLink}
       rel="noopener noreferrer"
       target="_blank"
      >
        <PrimaryButton
         label="Open App"
        className="ViewAppBtn"
        />
      </a>
      </div>
    ) 
    : (
      <div className="InfoHeader">{header}</div>
    ) }
  </div>
);

export default InformationBar;