import React from 'react';
import './ProgressBar.css';

const ProgressBar = (props) => {
  return (
    <div className="ProgressBar">
      <div className="ProgressBarFiller" style={{width: `${props.percentage}%`}} />
    </div>
  );
};

export default ProgressBar;
