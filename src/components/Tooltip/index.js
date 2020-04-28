import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as InfoIcon } from '../../assets/images/info-icon.svg';
import './Tooltip.css';

const Tooltip = ({ showIcon, keyword, message }) => (
  <div className="TooltipContainer">
    <div className="TooltipPlaceholder" tooltip-message={message}>
      {showIcon ? <InfoIcon /> : <div className="TooltipWordPlaceholder">{keyword}</div> }
    </div>
  </div>
);

Tooltip.propTypes = {
  showIcon: PropTypes.bool,
  keyword: PropTypes.string,
  message: PropTypes.string.isRequired
};

Tooltip.defaultProps = {
  showIcon: true,
  keyword: ''
};

export default Tooltip;
