
import React from "react";
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, } from "recharts";

const data = [
  {
    name: "Page A",
    uv: 590,
    amt: 1400,
    cnt: 490,
  },
  {
    name: "Page B",
    uv: 868,
    amt: 1506,
    cnt: 590,
  },
  {
    name: "Page C",
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350,
  },
  {
    name: "Page D",
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480,
  },
  {
    name: "Page E",
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460,
  },
  {
    name: "Page F",
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380,
  },
];

export default function Charts() {
  return (
    <div className="w-full">
      <ComposedChart
        width={370}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}>
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="uv"
          barSize={20}
          // fill="#008090"
          className="rounded-t-full from-[#0D0D10] to-[#0D0D10]/30 fill-[#0D0D10]"
          radius={[10, 10, 0, 0]}
        />
        {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" /> */}
      </ComposedChart>
    </div>
  );
}
