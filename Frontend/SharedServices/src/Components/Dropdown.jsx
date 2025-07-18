import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
const cn = (...classes) => classes.filter(Boolean).join(" ");
export function Dropdown({ label, children, icon: Icon, className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 shadow transition-all duration-300 dark:bg-slate-800 dark:shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
      >
        {label}
        {Icon ? <Icon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
        
      </button>
      {open && (
        <div className="absolute right-0 z-[99999] mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg dark:text-gray-100 dark:bg-slate-800 transition-all duration-300">
          <div className="py-1">
            {typeof children === "function" ? children({ setOpen }) : children}
          </div>
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn("flex w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-100", className)}
    >
      {children}
    </button>
  );
}

export function DropdownLabel({ children }) {
  return (
    <div className="px-4 py-2 text-xs text-gray-400 uppercase">{children}</div>
  );
}

export function DropdownDivider() {
  return <div className="my-1 h-px bg-gray-200" />;
}

export function DropdownButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-md bg-gray-100 text-sm font-medium hover:bg-gray-200 ${className}`}
    >
      {children}
    </button>
  );
}
export function DropdownMenu({ children }) {
  return (
    <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg">
      <div className="py-1">{children}</div>
    </div>
  );
}