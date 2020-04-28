import React from 'react';
import { ReactComponent as InfoIcon } from '../../assets/images/info-icon.svg';
import './Tooltip.css';

const Tooltip = ({ showIcon, keyword, message }) => (
  <div className="TooltipContainer">
    <div className="TooltipPlaceholder" tooltip-message={message}>
      {showIcon ? <InfoIcon /> : <div className="TooltipWordPlaceholder">{keyword}</div> }
    </div>
  </div>
);

export default Tooltip;
