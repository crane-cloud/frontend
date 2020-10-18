import React from 'react';
import DatePicker from './index';

const style = {
  marginTop: '100px',
  marginLeft: '300px',
};

const Sample = () => {
  return (
    <div style={style}>
      <DatePicker label="From" />
    </div>
  );
};

export default Sample;
