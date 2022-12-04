import React from "react";
import Header from "../Header";
import InformationBar from "../InformationBar";
import SideBar from "../SideBar";

const DashboardLayout = (params) => {
  const { children, name, credits, header } = params;
  return (
    <div className="Page">
      <div className="TopBarSection">
        <Header credits={credits?.amount} />
      </div>
      <div className="MainSection">
        <div className="SideBarSection">
          <SideBar name={name} />
        </div>
        <div className="MainContentSection">
          <div className="InformationBarSection">
            <InformationBar header={header} />
          </div>
          <div className="MainContent SmallContainer">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
