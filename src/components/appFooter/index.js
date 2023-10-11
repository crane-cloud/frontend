import React from "react";

const AppFooter = ({ position, sidebar }) => {
  let className = sidebar ? "appFooterForSideBar" : "appFooterRow";

  if (position === "absolute") {
    className += " footerPositionAbsolute";
  }

  return (
    <div className={className}>
      <p>
        Copyright {new Date().getFullYear()} Crane Cloud. All Rights Reserved.
      </p>
    </div>
  );
};

export default AppFooter;
