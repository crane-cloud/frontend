import React from 'react';
import Select from './index';

const clustersList = [
  {
    id: 1,
    name: 'Makerere'
  },
  {
    id: 2,
    name: 'Mbarara'
  },
  {
    id: 3,
    name: 'NITA'
  }
];

const handleChange = (input) => console.log(input);

const SelectSample = () => (
  <div style={{ backgroundColor: '#f1f1f1', height: '100vh' }}>
    <div style={{ padding: '50px', width: '400px' }}>
      <Select
        required
        placeholder="Choose a location"
        options={clustersList}
        onChange={handleChange}
      />
    </div>
  </div>
);

export default SelectSample;
