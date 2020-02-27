import React from 'react';
import './ProgressBar.css';

const ProgressBar = (props) => {

  let fillColor;
  if (props.percentage < 25) {
    fillColor = 'Quarter1';
  } else if (25 <= props.percentage && props.percentage < 50) {
    fillColor = 'Quarter2';
  } else if (50 <= props.percentage && props.percentage < 75) {
    fillColor = 'Quarter3';
  } else {
    fillColor = 'Quarter4';
  }

  return (
    <div className="ProgressBar">
      <div
        className={`ProgressBarFiller ProgressBarFill${fillColor}`}
        style={{ width: `${props.percentage}%` }}
      >
        {`${props.percentage}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
