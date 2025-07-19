import React from "react";

export function Announcement({ title, description, date, loading, onDismiss }) {
  if (loading) {
    return (
      <div className="w-full p-4 text-white bg-blue-600 rounded-xl shadow-md animate-pulse">
        Loading announcement...
      </div>
    );
  }

  return (
    <>
      <div className={`min-w-[300px] flex-shrink-0 px-2`}>
        <div
          className="relative mx-auto p-4 rounded-xl shadow-md flex items-center gap-3 text-white bg-blue-600 hover:bg-gray-200 hover:text-blue-600 h-36 transition-transform duration-200 ease-in-out transform hover:scale-[1.02]"
          role="alert"
        >
          {/* <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
        />
      </svg> */}

          <div className="flex-1 text-sm">
            <strong className="block font-semibold">{title}</strong>
            <span>{description}</span>
            {date && <p className="text-xs opacity-75 mt-1">📅 {date}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
