import React from "react";

export function Widget({
  title,
  value,
  icon,
  change,
  description,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
  children,
  loading= false
}) {
    if(loading) {
        return (
      <div className="bg-white rounded-2xl shadow-sm border flex justify-center items-center border-gray-200 p-12 hover:bg-gray-200 w-full">
        <svg
          className="animate-spin w-6 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (children) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full hover:bg-gray-200 h-48">
        {children}
      </div>
    );
  }



  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200  w-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
        </div>
        <div className={`rounded-full p-2 ${iconBg}`}>
          <div className={`text-xl ${iconColor}`}>{icon}</div>
        </div>
      </div>
      {description && (
        <p className="text-xs text-gray-400 mt-2">{description}</p>
      )}
      {change && (
        <div className="mt-3 text-sm">
          <span
            className={`font-medium ${
              change.startsWith("-") ? "text-red-600" : "text-green-600"
            }`}
          >
            {change}
          </span>{" "}
          from last week
        </div>
      )}
    </div>
  );
}
