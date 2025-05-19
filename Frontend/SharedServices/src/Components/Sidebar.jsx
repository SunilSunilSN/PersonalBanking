import React from "react";

export function Sidebar({ children }) {
  return <aside className="w-64 bg-gray-50 p-4 shadow-inner">{children}</aside>;
}

export function SidebarHeader({ children }) {
  return <div className="mb-4 text-lg font-bold">{children}</div>;
}

export function SidebarSection({ children }) {
  return <div className="mt-4 space-y-2">{children}</div>;
}

export function SidebarItem({ children }) {
  return (
    <div className="cursor-pointer rounded px-2 py-1 hover:bg-gray-200 text-sm font-medium">
      {children}
    </div>
  );
}

export function SidebarLabel({ children }) {
  return <div className="px-2 py-1 text-xs text-gray-500 uppercase">{children}</div>;
}

export function SidebarBody({ children }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}