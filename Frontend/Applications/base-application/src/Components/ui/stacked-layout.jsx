import React from "react";

export function StackedLayout({ sidebar, navbar, children }) {
  return (
    <div className="flex h-screen">
      {sidebar}
      <div className="flex flex-col flex-1">
        {navbar}
        <main className="flex-1 overflow-auto bg-gray-50 p-4">{children}</main>
      </div>
    </div>
  );
}