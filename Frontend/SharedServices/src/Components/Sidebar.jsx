import React from "react";

export function Sidebar({ children }) {
  return (
    <aside className="w-52 h-screen bg-gray-50 p-4 shadow-inner dark:bg-neutral-900 transition-all duration-300 ">
      {children}
    </aside>
  );
}

export function SidebarHeader({ children }) {
  return (
    <div className="mb-4 text-lg dark:text-gray-100 font-bold">{children}</div>
  );
}

export function SidebarSection({ children }) {
  return <div className="mt-4 space-y-2">{children}</div>;
}

export function SidebarItem({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex rounded px-2 py-1 hover:bg-gray-200 hover:text-blue-600 text-sm font-medium items-center dark:text-white dark:hover:text-blue-600 dark:hover:bg-blue-600/10"
    >
      {children}
    </div>
  );
}

export function SidebarLabel({ children }) {
  return (
    <div className="px-2 py-1 text-xs text-gray-500 dark:hover:text-white dark:text-gray-500 uppercase">
      {children}
    </div>
  );
}

export function SidebarBody({ children }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export function SidebarFooter({ children }) {
  return <div className="px-6 py-4 border-t border-gray-700">{children}</div>;
}

export function SidebarSpacer() {
  return <div className="my-4 border-t border-gray-700" />;
}
