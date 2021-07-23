import React from "react";

import "./DeleteWarning.css";

const DeleteWarning = (props) => {
  const { textAlignment } = props;
  return (
    <div className={textAlignment ? `DeleteWarning ${textAlignment}` : "DeleteWarning"}>
      <small>Note that this action is irreversible.</small>
    </div>
  );
};

export default DeleteWarning;
