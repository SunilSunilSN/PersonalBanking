import React from "react";
import { Graph } from "shared-services";
const sampleData = [
  { name: "Mon", value: 30 },
  { name: "Tue", value: 45 },
  { name: "Wed", value: 28 },
  { name: "Thu", value: 60 },
  { name: "Fri", value: 50 },
  { name: "Sat", value: 70 },
  { name: "Sun", value: 55 },
];
const data = [
  {
    name: "18-24",
    uv: 31.47,
    pv: 2400,
    fill: "#8884d8",
  },
  {
    name: "25-29",
    uv: 26.69,
    pv: 4567,
    fill: "#83a6ed",
  },
  {
    name: "30-34",
    uv: -15.69,
    pv: 1398,
    fill: "#8dd1e1",
  },
  {
    name: "35-39",
    uv: 8.22,
    pv: 9800,
    fill: "#82ca9d",
  },
  {
    name: "40-49",
    uv: -8.63,
    pv: 3908,
    fill: "#a4de6c",
  },
  {
    name: "50+",
    uv: -2.63,
    pv: 4800,
    fill: "#d0ed57",
  },
  {
    name: "unknow",
    uv: 6.67,
    pv: 4800,
    fill: "#ffc658",
  },
];
const graphTitle = "Spend Analyzer";
const graphTitle2 = "Radial Grap";
const GraphPage = () => {
  return (
    <div className="h-full flex">
      <Graph data={data} title={graphTitle2} type={"Radial"}></Graph>
      <Graph data={sampleData} title={graphTitle} type={"Line"}></Graph>
    </div>
  );
};
export default GraphPage;
