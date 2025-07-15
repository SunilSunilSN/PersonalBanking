import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export function Dropdown({ label, children }) {
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
        className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200"
      >
        {label} <ChevronDownIcon className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg">
          <div className="py-1">
            {typeof children === "function" ? children({ setOpen }) : children}
          </div>
        </div>
      )}
    </div>
  );
}

export function DropdownItem({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
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