import React from "react";
function QuicklinksWidget() {
  return (
    <div className="p-12">
      <div className="flex items-center justify-between  w-full">
        <div>
          <p className="text-sm text-gray-500">Quicklinks</p>
          <h3 className="text-2xl font-semibold text-gray-800">1,234</h3>
        </div>
        <div className="rounded-full p-2 bg-blue-100">
          <div className="text-xl text-blue-600">👤</div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">Active this week</p>
    </div>
  );
}
export default QuicklinksWidget;
