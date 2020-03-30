import React from 'react';
import './SpinnerComponent.css';


const Spinner = (props) => {
  const { size } = props;

  return (
    <div className="SmallSpinnerWrapper">
      <div className={`Spinner Spinner${size}`} />
    </div>
  );
};

const BigSpinner = () => (
  <div className="BigSpinnerContainer">
    <svg className="BigSpinner" width="100px" height="80px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle className="SpinnerPath" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30" />
    </svg>
  </div>
);

export default Spinner;
export { BigSpinner };
