import React from 'react';
import LineChartComponent from './index';
import './LineChart.css';

const sampleData = [
  { name: 'Sample Metric 1', uv: 250 },
  { name: 'Sample Metric 2', uv: 270 },
  { name: 'Sample Metric 2', uv: 10 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 70 },
  { name: 'Sample Metric 2', uv: 150 },
  { name: 'Sample Metric 2', uv: 60 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 190 },
  { name: 'Sample Metric 2', uv: 290 },
  { name: 'Sample Metric 2', uv: 150 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 130 },
  { name: 'Sample Metric 2', uv: 0 },
  { name: 'Sample Metric 2', uv: 270 },
  { name: 'Sample Metric 2', uv: 280 },
  { name: 'Sample Metric 2', uv: 300 },
  { name: 'Sample Metric 2', uv: 100 },
  { name: 'Sample Metric 2', uv: 170 },
  { name: 'Sample Metric 2', uv: 290 },
];

const SampleGraph = () => (
  <div style={{
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'content',
    alignItems: 'center'
  }}
  >
    <div style={{ height: '500px', width: '700px' }}>
      <LineChartComponent data={sampleData}>
      </LineChartComponent>
    </div>
  </div>
);

export default SampleGraph;
