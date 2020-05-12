import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import './Tabs.css';

const Tabs = ({ children }) => {
  // this funtion is to check for single child
  // since single child comes as an object, if found,
  // Change it to array
  if (Object.prototype.toString.call(children) !== '[object Array]') {
    const childrenArray = [];
    children = [...childrenArray, children];
  }

  const [activeTab, setActiveTab] = useState(children[0].props.index);

  const onClickTabItem = (tabIndex) => setActiveTab(tabIndex);

  return (
    <div className="TabsContainer">
      <ol className="tab-list">
        {children.map((child) => {
          const { index, label } = child.props;

          return (
            <Tab
              activeTab={activeTab}
              key={index}
              index={index}
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.index !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {

};

export default Tabs;
