import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({
  index, onClick, label, activeTab
}) => {
  const handleOnClick = () => {
    onClick(index);
  };

  return (
    <li className={` tab-list-item ${activeTab === index && 'tab-list-active'}`} onClick={handleOnClick} role="presentation">{label}</li>
  );
};

Tab.propTypes = {

};

export default Tab;
