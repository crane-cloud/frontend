import React from 'react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label
} from 'recharts';
import './LineChart.css';

const LineChartComponent = ({
  forPreview,
  data,
  yLabel,
  xLabel
}) => {
  return (
    <div className="LineChartContainer">
      <ResponsiveContainer width="100%" height="100%">
        {!forPreview ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis dataKey="name">
              <Label className="ChartLabel" value={xLabel} position="insideBottomCenter" dy={12} />
            </XAxis>
            <YAxis dataKey="memory(bytes)">
              <Label className="ChartLabel" value={yLabel} angle={270} position="insideLeft" dy={-10} />
            </YAxis>
            <Tooltip />
            <Line dot strokeWidth="2px" dataKey="memory(bytes)" stroke="#008AC1" />
          </LineChart>
        ) : (
          <LineChart>
            <Line dot strokeWidth="2px" dataKey="memory(bytes)" stroke="#008AC1" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
