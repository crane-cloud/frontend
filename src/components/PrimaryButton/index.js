import React from 'react';
import './PrimaryButton.css';

const PrimaryButton = props => {
    return <button className="Primary-Btn">{props.label}</button>;
};

export default PrimaryButton;