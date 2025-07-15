import React from "react";
const cn = (...classes) => classes.filter(Boolean).join(' ');

export function Sidebar({ children, className = "" }) {
  return (
    <aside
      className={`flex flex-col h-full bg-gray-50 dark:bg-neutral-900 shadow-inner pl-4 overflow-hidden ${className}`}
    >
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
  return <div className="my-2 space-y-2">{children}</div>;
}

export function SidebarItem({ children, onClick }) {
  return (
<div
  onClick={onClick}
  className="cursor-pointer flex items-center gap-2 min-w-0 px-2 py-1 rounded hover:bg-gray-200 hover:text-blue-600 text-sm font-medium dark:text-white dark:hover:text-blue-600 dark:hover:bg-blue-600/10"
>
  {children}
</div>
  );
}

export function SidebarLabel({ children, className }) {
  return (
    <div
      className={cn(
        "text-sm text-gray-500 dark:text-gray-500 uppercase transition-all duration-300 ease-in-out leading-[2.5rem]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SidebarBody({ children }) {
  return (
    <div className="overflow-y-auto overflow-x-hidden flex flex-col my-2">
      {children}
    </div>
  );
}

export function SidebarFooter({ children }) {
  return <div className="px-6 py-4 border-t border-gray-700">{children}</div>;
}

export function SidebarSpacer() {
  return <div className="my-2 border-t border-gray-700" />;
}
