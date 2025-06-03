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

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePageClick = (page) => setCurrentPage(page);

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div  className="rounded-2xl border border-gray-200 shadow-sm bg-white ">
      <div className="overflow-x-auto max-h-[400px] rounded-[1rem] flex justify-center">
        <table className="min-w-full text-sm table-fixed">
          <thead className="bg-gray-50 sticky top-0 z-10 whitespace-nowrap text-center">
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

          <tbody key={currentPage} className="divide-y divide-gray-100 animate-fade-slide animate-slide-in-right">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-400"
                >
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-400 "
                >
                  No data available.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={idx}
                  className={`cursor-pointer hover:bg-gray-200 animate-slide-in-right`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-4 py-3 text-gray-700 text-center ${
                        row.isPrimary && col.key === "Acc"
                          ? " justify-center flex gap-2 items-center"
                          : ""
                      }`}
                      onClick={col.onClick ? () => col.onClick(row) : undefined}
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

      {/* Pagination */}
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
  );
}
