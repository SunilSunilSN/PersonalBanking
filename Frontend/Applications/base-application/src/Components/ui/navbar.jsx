export function Navbar({ children }) {
  return <nav className="flex items-center gap-4 bg-white p-5 shadow">{children}</nav>;
}

export function NavbarItem({ children, href, onClick, current }) {
  const baseStyles = 'text-sm font-medium cursor-pointer px-3 py-2 rounded-md transition-colors';
  const stateStyles = current
    ? 'text-blue-600 font-semibold'
    : 'text-gray-900 hover:text-blue-600';

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

export function NavbarSection({ children }) {
  return <div className="flex items-center gap-4">{children}</div>;
}

export function NavbarLabel({ children }) {
  return <span className="text-s text-gray-500 uppercase">{children}</span>;
}

export function NavbarDivider() {
  return <div className="h-4 w-px bg-gray-300" />;
}

export function NavbarSpacer() {
  return <div className="flex-grow" />;
}