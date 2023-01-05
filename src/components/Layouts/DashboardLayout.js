import React from "react";
import Header from "../Header";
import InformationBar from "../InformationBar";
import SideBar from "../SideBar";
import "./Layouts.css";

const DashboardLayout = (props) => {
  const { children, name, credits, header, short = false } = props;
  return (
    <div className="DashboardPage">
      <div className="DashboardTopBarSection">
        <Header credits={credits?.amount} />
      </div>
      <div className="DashboardMainSection">
        <div className="DashboardSideBarSection">
          <SideBar name={name} />
        </div>
        <div className="DashboardMainContentSection">
          <div>
            <InformationBar header={header} {...props} />
          </div>
          <div
            className={`${
              short ? "ShortContainer" : "SmallContainer"
            } DasboardChildrenSection`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
