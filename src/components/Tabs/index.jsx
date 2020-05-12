import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

const Tabs = ({ children }) => {
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
              label={label}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {

};

export default Tabs;
