import React from "react";
import {
    BarChart,
    Bar,XAxis, YAxis, CartesianGrid, Legend,
     ResponsiveContainer
} from 'recharts';

const BarGraph = (props) => {
  const {
     data, 
     height, 
     width,
     barSize,
     width_percentage, 
     height_percentage 
    } = props;

  return (
    <ResponsiveContainer width={width_percentage} height={height_percentage}>
    <BarChart
       width={width}
       height={height}
       data={data}
       margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
       }}
     barSize={barSize}
 >
      <XAxis dataKey="date" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      
       <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="amount" fill="#8884d8" background={{ fill: '#eee' }} />
       </BarChart>
   </ResponsiveContainer>
  );
};

export default BarGraph;
