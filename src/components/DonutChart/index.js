import React from "react";
import {
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import "./DonutChart.css";

const DonutChart = (props) => {
  const {
    center_x,
    center_y, 
    InnerRadius,
     OuterRadius, 
     data, 
     height, 
     width,
     onPieEnter
    } = props;

  return (
    <div className="DonutChart">
      <PieChart width={width} height={height} onMouseEnter={onPieEnter}>
        <Pie
          data={data}
          cx={center_x}
          cy={center_y}
          innerRadius={InnerRadius}
          outerRadius={OuterRadius}
          fill="#8884d8"
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={data[(index % data.length)].color} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default DonutChart;
