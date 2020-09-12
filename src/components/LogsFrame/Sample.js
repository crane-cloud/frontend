import React from 'react';
import Logs from './index';

const logs = [
  'create mode 100644 src/components/LogsDisplay/LogsDisplay.css',
  'create mode 100644 src/components/LogsDisplay/Sample.js',
  'create mode 100644 src/components/LogsDisplay/index.jsx'
];

const Sample = () => {
  return (
    <div style={{ margin: '50px 100px', width: '100%', height: '100vh' }}>
      <Logs data={logs} title="App logs" />
    </div>
  );
};

export default Sample;
