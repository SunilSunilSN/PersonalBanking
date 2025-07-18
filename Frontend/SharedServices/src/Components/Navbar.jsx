import React from "react";

const cn = (...classes) => classes.filter(Boolean).join(' ');

export function Navbar({ children }) {
  return (
    <nav className="flex items-center gap-2 sm:gap-4 bg-white p-3 shadow transition-all duration-300 dark:bg-neutral-900 dark:shadow-[0_2px_10px_rgba(255,255,255,0.05)]">
      {children}
    </nav>
  );
}

export function NavbarItem({ children, href, onClick, current, className }) {
  const baseStyles = 'text-sm font-medium cursor-pointer px-2 py-1 rounded-md transition-colors dark:text-white whitespace-nowrap ';
  const stateStyles = current
    ? 'text-blue-600 font-semibold'
    : 'text-gray-900 hover:text-blue-600 dark:hover:text-blue-600';

  const classNames = `${baseStyles} ${stateStyles} ${className}`;

  if (href) {
    return (
      <a href={href} className={classNames} aria-current={current ? 'page' : undefined}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classNames} type="button">
      {children}
    </button>
  );
}

export function NavbarSection({ children, className }) {
  return <div className={cn("flex  items-center sm:gap-4 px-2 py-1", className)}>{children}</div>;
}

export function NavbarLabel({ children, className }) {
  return <span className={cn("text-xs sm:text-s text-gray-700 uppercase whitespace-nowrap ", className)}>{children}</span>;
}

export function NavbarDivider() {
  return <div className="hidden sm:block h-4 w-px bg-gray-300" />;
}

export function NavbarSpacer() {
  return <div className="flex-grow" />;
}
