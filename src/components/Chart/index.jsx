import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import './Chart.css'

const Chart = ({ data }) => {
  return (
    <div className="ChartContainer">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line dot={false} strokeWidth="2px" dataKey="uv" stroke="#008AC1" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart;
