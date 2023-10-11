import React from "react";
 
const AppFooter = ({position}) => {
  return (
    <div className={`appFooterRow  ${position === "absolute" ? "footerPositionAbsolute": ""}`}>
     <p>
     Copyright {new Date().getFullYear()} Crane Cloud. All Rights Reserved.
    </p>
  </div>
  );
};

export default AppFooter;