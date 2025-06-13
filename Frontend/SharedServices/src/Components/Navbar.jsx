import React from "react";
const cn = (...classes) => classes.filter(Boolean).join(' ');
export function Navbar({ children }) {
  return <nav className="flex items-center gap-4 bg-white p-4 shadow transition-all duration-300 dark:bg-neutral-900 dark:shadow-[0_2px_10px_rgba(255,255,255,0.05)]">{children}</nav>;
}

export function NavbarItem({ children, href, onClick, current }) {
  const baseStyles = 'text-sm font-medium cursor-pointer px-3 py-2 rounded-md transition-colors dark:text-white';
  const stateStyles = current
    ? 'text-blue-600 font-semibold'
    : 'text-gray-900 hover:text-blue-600 dark:hover:text-blue-600';

  const className = `${baseStyles} ${stateStyles}`;

  if (href) {
    return (
      <a href={href} className={className} aria-current={current ? 'page' : undefined}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className} type="button">
      {children}
    </button>
  );
}

export function NavbarSection({ children,  }) {
  return <div className="flex items-center gap-4">{children}</div>;
}

export function NavbarLabel({ children, className }) {
  return <span className={cn("text-s text-gray-500 uppercase", className)}>{children}</span>;
}

export function NavbarDivider() {
  return <div className="h-4 w-px bg-gray-300" />;
}

export function NavbarSpacer() {
  return <div className="flex-grow" />;
}