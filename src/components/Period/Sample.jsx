import React, { useState } from 'react';
import Period from './index';

const Sample = () => {
  const [activePeriod, setActivePeriod] = useState();

  const handleChange = (selected) => {
    setActivePeriod(selected);
  };

  console.log(activePeriod);

  return (
    <div>
      <Period onChange={handleChange} />
    </div>
  );
};

export default Sample;
