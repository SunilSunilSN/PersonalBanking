import React from "react";
import { Graph } from "shared-services";
const sampleData = [
  { name: "Mon", value: 30, valueName: "testValue" },
  { name: "Tue", value: 45,valueName: "testValue" },
  { name: "Wed", value: 28, valueName: "testValue" },
  { name: "Thu", value: 60, valueName: "testValue" },
  { name: "Fri", value: 50, valueName: "testValue" },
  { name: "Sat", value: 70, valueName: "testValue" },
  { name: "Sun", value: 55, valueName: "testValue" },
];
const data2 = [
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
const graphTitle1 = "Spend Analyzer";
const graphTitle2 = "Radial Grap";
const GraphPage = ({data, graphTitle}) => {
  return (
    <div className="h-full flex gap-4 p-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      <Graph data={data2} title={graphTitle2} type={"Radial"}></Graph>
      <Graph  data={sampleData} title={graphTitle1} type={"Line"} loading={false}></Graph>
    </div>
  );
};
export default GraphPage;
