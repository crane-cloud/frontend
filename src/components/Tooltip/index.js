import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as InfoIcon } from '../../assets/images/info-icon.svg';
import './Tooltip.css';

const Tooltip = ({
  showIcon,
  keyword,
  message,
  position
}) => (
  <div className="TooltipContainer">
    <div className="TooltipPlaceholder" position={position} tooltip-message={message}>
      {showIcon ? <InfoIcon /> : <div className="TooltipWordPlaceholder">{keyword}</div> }
    </div>
  </div>
);

Tooltip.propTypes = {
  showIcon: PropTypes.bool,
  keyword: PropTypes.string,
  message: PropTypes.string.isRequired,
  position: PropTypes.string
};

Tooltip.defaultProps = {
  showIcon: true,
  keyword: '',
  position: 'top'
};

export default Tooltip;
