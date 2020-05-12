import React from 'react';
import Tabs from '.';

const SampleTabs = () => (
  <div style={{ width: '25rem' }}>
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

export default SampleTabs;
