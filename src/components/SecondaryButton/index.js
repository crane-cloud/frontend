import React from 'react';
import './SecondaryButton.css';

const SecondaryButton = props => {
  return (
    <div>
      {
        props.isBlack ? (<button className="Secondary-Btn SecondaryBlack">{props.label}</button>):
          (<button className="Secondary-Btn SecondaryWhite">{props.label}</button>)
      }
    </div>
  );
  
};

export default SecondaryButton;