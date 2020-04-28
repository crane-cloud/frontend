import React from 'react';
import { ReactComponent as InfoIcon } from '../../assets/images/info-icon.svg';
import './Tooltip.css';

const Tooltip = ({ showIcon, keyword, message }) => (
  <div className="TooltipContainer">
    <div className="TooltipContentToDisplay">
      {showIcon ? <InfoIcon /> : keyword }
      <div className="TooltipMessage">
        {message}
      </div>
    </div>
  </div>
);

export default Tooltip;
