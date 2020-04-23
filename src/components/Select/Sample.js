import React from 'react';
import Select from './index';

const SelectSample = () => (
  <div style={{ backgroundColor: '#f1f1f1', height: '100vh' }}>
    <div style={{ padding: '50px', width: '400px' }}>
      <Select
        required
        placeholder="Choose a location"
      />
    </div>
  </div>
);

export default SelectSample;
