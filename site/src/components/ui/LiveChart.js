import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { LineChart } from '@opd/g2plot-react';
// Aimport { Chart } from 'react-charts'
const LiveChart = ({ data = [] }) => {
  const chartRef = useRef();
  const config = {
    height: 350,
    autoFit: true,
    xField: 'time',
    yField: 'value',
    smooth: false,
    animation: false,
    meta: {
      value: {
        max: 1000,
      },
    },
    data,
  };
  return <LineChart {...config} chartRef={chartRef} />;
};
LineChart.propTypes = {
  data: PropTypes.array.isRequired,
};
export default LiveChart;
