import React from "react";
const cn = (...classes) => classes.filter(Boolean).join(" ");
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadialBar,
  RadialBarChart,
  Legend,
  ComposedChart,
  Area,
  Bar,
} from "recharts";

export function Graph({
  data,
  title,
  type = "Line",
  className,
  loading = true,
}) {
  if (type === "Line") {
    return (
      <div
        className={`w-full h-full sm:h-96 md:h-[400px] lg:h-[400px] ${className}`}
      >
        {loading ? (
          <div className="bg-white rounded-2xl shadow border dark:bg-slate-800 border-gray-200 hover:bg-gray-50 transition-transform duration-500 ease-in-out transform hover:scale-[1.02] p-4 h-full dark:bg-slate-800">
            {" "}
            Loading{" "}
          </div>
        ) : data.length === 0 ? (
          <div className="bg-white rounded-2xl shadow border text-gray-400 hover:bg-gray-50 transition-transform duration-500 ease-in-out transform hover:scale-[1.02] p-4 h-full dark:bg-slate-800">
            {" "}
            NO Data Available{" "}
          </div>
        ) : (
          <div className="bg-white text-black dark:text-gray-100 rounded-2xl  dark:bg-slate-800 shadow border border-gray-200 hover:bg-gray-50 transition-transform duration-500 ease-in-out transform hover:scale-[1.02] p-4 h-full">
            <div className="text-lg font-semibold mb-4">{title}</div>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "value")
                      return [`${value}`, data[0].valueName];
                    if (name === "value2")
                      return [`${value}`, data[0].value2Name];
                    return [`${value}`, name]; // Default case
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={
                    data[0].hasOwnProperty("lineColour")
                      ? data[0].lineColour
                      : "#3b82f6"
                  }
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationEasing="linear"
                />
                {data[0].hasOwnProperty("value2") && (
                  <Line
                    type="monotone"
                    dataKey="value2"
                    stroke={
                      data[0].hasOwnProperty("line2Colour")
                        ? data[0].line2Colour
                        : "#3b82f6"
                    }
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={true}
                    animationDuration={1500}
                    animationEasing="linear"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  } else if (type === "Radial") {
    return (
      <div
        className={`w-full h-64 sm:h-96 md:h-[400px] lg:h-[400px] ${className}`}
      >
        {loading ? (
          <div className="bg-white rounded-2xl shadow border dark:bg-slate-800 border-gray-200 p-4 h-full transition-transform duration-500 ease-in-out transform hover:scale-[1.02]">
            Loading
          </div>
        ) : data.length === 0 ? (
          <div className="bg-white rounded-2xl shadow border text-gray-400 dark:bg-slate-800 border-gray-200 p-4 h-full transition-transform duration-500 ease-in-out transform hover:scale-[1.02]">
            NO Data Available
          </div>
        ) : (
          <div className="bg-white text-black dark:text-gray-100 rounded-2xl dark:bg-slate-800 shadow border border-gray-200 p-4 h-full transition-transform duration-500 ease-in-out transform hover:scale-[1.02]">
            <div className="text-lg font-semibold mb-4 ">{title}</div>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="10%"
                outerRadius="90%"
                data={data}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  minAngle={15}
                  // label={{ fill: "#666", position: "insideStart" }}
                  background
                  clockWise={true}
                  dataKey="uv"
                  animationDuration={1200}
                />
                <Legend
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{
                    display: "none", // base hidden
                    // Tailwind-style media query for large screens and up
                    ...(typeof window === "undefined"
                      ? {}
                      : window.innerWidth >= 1024
                      ? { display: "block" }
                      : {}),
                  }}
                />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  } else if (type === "Bar") {
    return (
      <div
        className={`w-full h-full sm:h-96 md:h-[400px] lg:h-[400px] ${className}`}
      >
        {loading ? (
          <div className="bg-white rounded-2xl shadow border dark:bg-slate-800 border-gray-200 p-4 h-full transition-transform duration-500 ease-in-out transform hover:scale-[1.02]">
            Loading
          </div>
        ) : data.length === 0 ? (
          <div className="bg-white rounded-2xl shadow border text-gray-400 dark:bg-slate-800 border-gray-200 p-4 h-full transition-transform duration-500 ease-in-out transform hover:scale-[1.02]">
            NO Data Available
          </div>
        ) : (
          <div className="bg-white text-black dark:text-gray-100 rounded-2xl dark:bg-slate-800 shadow border border-gray-200 p-4 h-full transition-transform duration-500 ease-in-out transform hover:scale-[1.02]">
            <div className="text-lg font-semibold mb-4">{title}</div>
            <ResponsiveContainer width="100%" height="80%">
              <ComposedChart data={data}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amt"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
                <Bar
                  dataKey="Balance"
                  barSize={20}
                  fill="rgb(37 99 235 / var(--tw-bg-opacity, 1))"
                />
                <Line type="monotone" dataKey="TotalBalance" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    );
  }
}

export default Graph;
