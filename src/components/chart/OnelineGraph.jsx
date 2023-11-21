import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const OneLineGraph = () => {
  const data = [
    { name: "Jan", uv: 4000, Active: 50, amt: 2400, },
    { name: "Feb", uv: 3000, Active: 62, amt: 2210, },
    { name: "Mar", uv: 2000, Active: 29, amt: 2290, },
    { name: "Apr", uv: 2780, Active: 70, amt: 2000, },
    { name: "May", uv: 1890, Active: 50, amt: 2181, },
    { name: "Jun", uv: 2390, Active: 40, amt: 2500, },
    { name: "Jul", uv: 3490, Active: 67, amt: 2100, },
    { name: "Aug", uv: 3490, Active: 33, amt: 2100, },
    { name: "Sep", uv: 3490, Active: 45, amt: 2100, },
    {
      name: "Oct", uv: 3490,
      Active: 45,
      amt: 2100,
    },
    {
      name: "Nov",
      uv: 3490,
      Active: 78,
      amt: 2100,
    },
    {
      name: "Dec",
      uv: 3490,
      Active: 27,
      amt: 2100,
    },
  ];
  return (

    <ResponsiveContainer height={300} width="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="paint0_linear_2462_9049" x1="321.543" y1="-123.644" x2="319.855" y2="222.585" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0EAB8B" stopOpacity="0.24" />
            <stop offset="1" stopColor="#0EAB8B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis type="number" domain={[0, 100]} />
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Active"
          stroke="#82CA9D"
          fillOpacity={1}
          fill="url(#paint0_linear_2462_9049)"
        />
      </AreaChart>
    </ResponsiveContainer>

  );
};
export default OneLineGraph;