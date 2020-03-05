import React from 'react';
import './ProgressBar.css';

const ProgressBar = (props) => {
  const { percentage, fractionLabel } = props;
  let fillColor;
  if (percentage < 25) {
    fillColor = 'Quarter1';
  } else if (percentage >= 25 && percentage < 50) {
    fillColor = 'Quarter2';
  } else if (percentage >= 50 && percentage < 75) {
    fillColor = 'Quarter3';
  } else {
    fillColor = 'Quarter4';
  }

  return (
    <div className="ProgressBarContainer">
      <div className="ProgressBar">
        <div
          className={`ProgressBarFiller ProgressBarFill${fillColor}`}
          style={{ width: `${percentage === 0 ? '100' : percentage}%` }}
        >
          {fractionLabel ? `${fractionLabel}` : `${percentage}%`}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
