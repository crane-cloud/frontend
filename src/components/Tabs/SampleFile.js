import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '.';

const SampleTabs = () => (
  <div>
    <Tabs>
      <div index={1} label="Tab One">
        Tab One
      </div>
      <div index={2} label="Tab Two">
        Tab Two
      </div>
      <div index={3} label="Tab Three">
        Tab Three
      </div>
    </Tabs>
  </div>
);

SampleTabs.propTypes = {

};

export default SampleTabs;
