import React from 'react';

export const Status = (props) => {
  return (
    <div className={`StatusSignal StatusIs${props.status}`} />
  );
};
