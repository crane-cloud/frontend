import React from 'react';
import PropTypes from 'prop-types';
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
  preview,
  data,
  yLabel,
  xLabel,
  xDataKey,
  yDataKey,
  lineDataKey
}) => (
  <div className="LineChartContainer">
    <ResponsiveContainer width="100%" height="100%">
      {preview ? (
        <LineChart data={data}>
          <Line dot={false} strokeWidth="2px" dataKey={lineDataKey} stroke="#008AC1" />
        </LineChart>
      ) : (
        <>
          {data.length > 0 ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3" />
              <XAxis dataKey={xDataKey}>
                <Label className="ChartLabel" value={xLabel} position="centerBottom" dy={12} />
              </XAxis>
              <YAxis dataKey={yDataKey}>
                <Label className="ChartLabel" value={yLabel} angle={270} position="insideLeft" dy={-10} />
              </YAxis>
              <Tooltip />
              <Line dot strokeWidth="2px" dataKey={lineDataKey} stroke="#008AC1" />
            </LineChart>
          ) : (
            <div className="LogsEmpty">
              <div>No logs available</div>
            </div>
          )}
        </>
      )}
    </ResponsiveContainer>
  </div>
);

LineChartComponent.propTypes = {
  preview: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  yLabel: PropTypes.string,
  xLabel: PropTypes.string,
  xDataKey: PropTypes.string,
  yDataKey: PropTypes.string,
  lineDataKey: PropTypes.string
};

LineChartComponent.defaultProps = {
  preview: false,
  xLabel: '',
  yLabel: '',
  xDataKey: '',
  yDataKey: '',
  lineDataKey: ''
};

export default LineChartComponent;
