import React from "react";
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
} from "recharts";

export function Graph({
  data = sampleData,
  title = graphTitle,
  type = "Line",
}) {
  if (type === "Line") {
    return (
      <div className="w-full md:w-1/2 h-96 p-4">
        <div className="bg-white rounded-2xl shadow border border-gray-200 hover:bg-gray-50 transition-transform duration-500 ease-in-out transform hover:scale-[1.02] p-4 h-full">
          <div className="text-lg font-semibold mb-4">{title}</div>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={true}
                animationDuration={1500}
                animationEasing="linear"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  } else if (type === "Radial") {
    return (
      <div className="w-full md:w-1/2 h-96 p-4 ">
        <div className="bg-white rounded-2xl shadow border border-gray-200 hover:bg-gray-50 transition-transform duration-500 ease-in-out transform hover:scale-[1.02] p-4 h-full">
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <div className="w-full h-64">
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
                  label={{ fill: "#666", position: "insideStart" }}
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
                />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;
