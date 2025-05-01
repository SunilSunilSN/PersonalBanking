import React, { useEffect, useState } from "react";
const Header = () => {
  const [headerItems, setHeaderItems] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fetchHeaderData = async () => {
    const data = await window.getCommonData([
      "Sunil",
      "Sunil1",
      "Pre-Login-Header",
    ]);
    const PreLoginHeader = data.find((item) => item.Key === "Pre-Login-Header");
    if (PreLoginHeader && PreLoginHeader.Value) {
      const headers = PreLoginHeader.Value.filter(
        (visib) =>
          visib.Visible === window.getDeviceType() || visib.Visible === "Both"
      );
      if (headers) setHeaderItems(headers);
    }
  };
  useEffect(() => {
    fetchHeaderData(); // ✅ call inside useEffect
  }, []);
  return (
    <header className="bg-blue-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800">
            My Personal Banking App
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              {headerItems.map((item, index) => (
                <li key={index}>
                  <a
                    id="HeaderId"
                    className="text-gray-600 hover:text-black cursor-pointer"
                    onClick={() =>
                      window.launchMicroApp(
                        item.Navigate.MicroApp,
                        item.Navigate.Screen,
                        "LoginId"
                      )
                    }
                  >
                    {item.Name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2">
            <ul className="flex flex-col space-y-2">
              {headerItems.map((item, index) => (
                <li key={index}>
                  <a
                    className="block text-gray-700 hover:text-black px-4 py-2"
                    onClick={() => {
                      setIsMobileMenuOpen(false); // close menu on click
                      window.launchMicroApp(
                        item.Navigate.MicroApp,
                        item.Navigate.Screen,
                        "microAppRoot2"
                      );
                    }}
                  >
                    {item.Name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
