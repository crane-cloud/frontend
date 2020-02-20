import React from 'react';
import './PrimaryButton.css';

const PrimaryButton = (props) => {
  const { label } = props;
  return <button className="Primary-Btn uppercase">{label}</button>;
};

export default PrimaryButton;
