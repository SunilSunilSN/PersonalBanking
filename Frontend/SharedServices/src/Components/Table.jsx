// components/Table.jsx
import React, { useState } from "react";
import { BanknotesIcon } from "@heroicons/react/24/outline";
export function Table({
  columns = [],
  data = [],
  loading = true,
  rowsPerPage = 10,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  return (
    <div className="w-full rounded-2xl border border-gray-200 shadow-sm bg-white">
      {/* Header */}
      <div className="overflow-x-auto rounded-[1rem_1rem_0rem_0rem] ">
        <table className="min-w-full text-sm text-left ">
          <thead className="bg-gray-50 sticky top-0 z-10 whitespace-nowrap">
            <tr colSpan={columns.length}>
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
        <div key={currentPage} className="animate-fade-slide">
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
              ) : paginatedData.length === 0 ? (
                <tr className="hover:bg-gray-200">
                  <td
                    colSpan={columns.length}
                    className="text-center py-6 text-gray-400"
                  >
                    No data available.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`cursor-pointer opacity-0 hover:bg-gray-200 ${
                      idx % 2 === 0
                        ? "animate-slide-in-right"
                        : "animate-slide-in-right"
                    }`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 py-3 text-gray-700 ${
                          row.isPrimary && col.key === "Acc" ? "gap-4 flex" : ""
                        }`}
                        onClick={
                          col.onClick ? () => col.onClick(row) : undefined
                        }
                      >
                        {typeof col.render === "function"
                          ? col.render(row)
                          : row[col.key]}
                        {row.isPrimary === true && col.key === "Acc" && (
                          <BanknotesIcon className="w-5 h-5 text-green-600" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!loading && totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t border-gray-200">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <div className="space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageClick(i + 1)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "border border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
