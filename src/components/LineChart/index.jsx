import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import './LineChart.css'

const LineChartComponent = ({ data }) => {
  return (
    <div className="LineChartContainer">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line dot={false} strokeWidth="2px" dataKey="uv" stroke="#000000" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChartComponent;
