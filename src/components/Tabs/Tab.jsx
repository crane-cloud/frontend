import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({
  index, onClick, label, activeTab
}) => {
  const handleOnClick = () => {
    onClick(index);
  };

  return (
    <li className={`TabHeadingListItem ${activeTab === index && 'TabHeadingListItemActive'}`} onClick={handleOnClick} role="presentation">{label}</li>
  );
};

Tab.propTypes = {
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({})
  ]).isRequired,
  activeTab: PropTypes.number.isRequired
};

export default Tab;
