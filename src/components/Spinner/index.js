import React from 'react';
import './Spinner.css';


const Spinner = (props) => {
  const { size } = props;

  return (
    <div className="SmallSpinnerWrapper">
      <div className={`Spinner Spinner${size}`} />
    </div>
  );
};

export default Spinner;
