import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, } from 'recharts';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400, },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290, },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181, },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500, },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100, },
];

const CompoChart = () => {
  return (

    <ResponsiveContainer height={300} width="100%">
      <BarChart
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        data={data}>
        <defs>
          <linearGradient id="paint0_linear_2462_9012" x1="9.99946" y1="13.0555" x2="9.99953" y2="235" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EAB8B" />
            <stop offset="1" stopColor="#0EAB8B" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <Bar
          dataKey="uv"
          barSize={20}
          type="monotone"

          stroke="#82CA9D"
          fillOpacity={1}
          fill="url(#paint0_linear_2462_9012)"
          // fill="#008090"
          className="rounded-t-full hover:bg-opacity-70"
          radius={[10, 10, 0, 0]}
        />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
      </BarChart>
    </ResponsiveContainer >

  );
};

export default CompoChart;
