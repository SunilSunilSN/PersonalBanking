// components/Table.jsx
import React from "react";

export function Table({ columns = [], data = [], loading = true }) {
  return (
    <div className="w-full rounded-2xl border border-gray-200 shadow-sm bg-white">
      {/* Header */}
      <div className="overflow-x-auto rounded-[1rem_1rem_0rem_0rem] ">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 font-semibold text-gray-600 border-b border-gray-200"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      {/* Scrollable Body */}
      <div className="max-h-[400px] overflow-y-auto">
        <table className="min-w-full text-sm text-left ">
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr className="hover:bg-gray-200">
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-400 hover:bg-gray-200" 
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr className="hover:bg-gray-200">
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-400"
                >
                  No data available.
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={idx}
                  className={`opacity-0 hover:bg-gray-200 ${
                    idx % 2 === 0
                      ? "animate-slide-in-right"
                      : "animate-slide-in-right"
                  }`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-700 ">
                      {typeof col.render === "function"
                        ? col.render(row)
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
