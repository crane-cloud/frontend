import React from 'react';
import './SecondaryButton.css';

const SecondaryButton = props => {
    return <button className="Secondary-Btn">{props.label}</button>;
};

export default SecondaryButton;