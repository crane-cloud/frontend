import React from 'react';
import LineChartComponent from './index';
import './LineChart.css';

const sampleData = [
  { name: 'July 01', 'memory(bytes)': 250 },
  { name: 'July 02', 'memory(bytes)': 270 },
  { name: 'July 03', 'memory(bytes)': 10 },
  { name: 'July 04', 'memory(bytes)': 100 },
  { name: 'July 05', 'memory(bytes)': 70 },
  { name: 'July 06', 'memory(bytes)': 150 },
  { name: 'July 07', 'memory(bytes)': 60 },
  { name: 'July 08', 'memory(bytes)': 100 },
  { name: 'July 09', 'memory(bytes)': 190 },
  { name: 'July 10', 'memory(bytes)': 290 },
  { name: 'July 11', 'memory(bytes)': 150 },
  { name: 'July 12', 'memory(bytes)': 100 },
  { name: 'July 13', 'memory(bytes)': 130 },
  { name: 'July 14', 'memory(bytes)': 0 },
  { name: 'July 15', 'memory(bytes)': 270 },
  { name: 'July 16', 'memory(bytes)': 280 },
  { name: 'July 17', 'memory(bytes)': 300 },
  { name: 'July 18', 'memory(bytes)': 100 },
  { name: 'July 19', 'memory(bytes)': 170 },
  { name: 'July 20', 'memory(bytes)': 290 },
  { name: 'July 21', 'memory(bytes)': 250 },
  { name: 'July 22', 'memory(bytes)': 270 },
  { name: 'July 23', 'memory(bytes)': 10 },
  { name: 'July 24', 'memory(bytes)': 100 },
  { name: 'July 25', 'memory(bytes)': 70 },
  { name: 'July 26', 'memory(bytes)': 150 },
  { name: 'July 27', 'memory(bytes)': 60 },
  { name: 'July 28', 'memory(bytes)': 100 },
  { name: 'July 29', 'memory(bytes)': 190 },
  { name: 'July 30', 'memory(bytes)': 290 },
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
      <LineChartComponent xLabel="Time" yLabel="RAM(MBs)" data={sampleData} />
    </div>
  </div>
);

export default SampleGraph;
