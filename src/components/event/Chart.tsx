// test chart

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: '6:30 PM',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '6:40 PM',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '6:50 PM',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '7:00 PM',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '7:10 PM',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '7:20 PM',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '7:30 PM',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Chart = () => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="" vertical={false} stroke="#d9d9d960" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'black',
            border: '1px solid rgba(217, 217, 217, 0.3)',
            borderRadius: '4px'
          }}
        />
        <Line type="bump" dataKey="pv" stroke="#8884d8" activeDot={false} dot={false} />
        <Line type="bump" dataKey="uv" stroke="#FF4500" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;