import React from 'react';
import LineChartComponent from './index';
import './LineChart.css';

const sampleData = [
  { name: '01', 'memory(bytes)': 250 },
  { name: '02', 'memory(bytes)': 270 },
  { name: '03', 'memory(bytes)': 10 },
  { name: '04', 'memory(bytes)': 100 },
  { name: '05', 'memory(bytes)': 70 },
  { name: '06', 'memory(bytes)': 150 },
  { name: '07', 'memory(bytes)': 60 },
  { name: '08', 'memory(bytes)': 100 },
  { name: '09', 'memory(bytes)': 190 },
  { name: '10', 'memory(bytes)': 290 },
  { name: '11', 'memory(bytes)': 150 },
  { name: '12', 'memory(bytes)': 100 },
  { name: '13', 'memory(bytes)': 130 },
  { name: '14', 'memory(bytes)': 0 },
  { name: '15', 'memory(bytes)': 270 },
  { name: '16', 'memory(bytes)': 280 },
  { name: '17', 'memory(bytes)': 300 },
  { name: '18', 'memory(bytes)': 100 },
  { name: '19', 'memory(bytes)': 170 },
  { name: '20', 'memory(bytes)': 290 },
  { name: '21', 'memory(bytes)': 250 },
  { name: '22', 'memory(bytes)': 270 },
  { name: '23', 'memory(bytes)': 10 },
  { name: '24', 'memory(bytes)': 100 },
  { name: '25', 'memory(bytes)': 70 },
  { name: '26', 'memory(bytes)': 150 },
  { name: '27', 'memory(bytes)': 60 },
  { name: '28', 'memory(bytes)': 100 },
  { name: '29', 'memory(bytes)': 190 },
  { name: '30', 'memory(bytes)': 290 },
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
      <LineChartComponent forPreview={false} xLabel="July" yLabel="RAM(MBs)" data={sampleData} />
    </div>
  </div>
);

export default SampleGraph;
