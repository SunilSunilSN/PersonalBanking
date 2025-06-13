import React, { useEffect, useState } from "react";
import { LinkIcon } from "@heroicons/react/20/solid";

const QuickLinksWidget = () => {
  const [quicks, setQuicks] = useState([]);
  const fetchQucikLinks = async () => {
    const data = await window.getCommonData(["Quciklinks"]);
    const quickLinksList = data.find((item) => item.Key === "Quciklinks");
    if (quickLinksList && quickLinksList.Value) {
      const quicks = quickLinksList.Value.filter(
        (item) =>
          item.Visible === window.getDeviceType() || item.Visible === "Both"
      );

      if (quicks) setQuicks(quicks);
    }
  };
  useEffect(() => {
    fetchQucikLinks();
  }, []);

  if (!quicks.length) return null;

  return (
    <div className="rounded-2xl p-4 w-full max-w-md mx-auto animate-fade-slide">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quicks.map((item, idx) => (
          <li key={idx}>
            <button
              onClick={() => handleClick(item)}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg transition duration-500 ease-in-out transform hover:scale-[1.02]"
            >
              {item.icon || <LinkIcon className="w-4 h-4" />}
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const handleClick = (item) => {
  if (item.type === "internal") {
    // Navigate inside micro app
    window.launchMicroApp(item.microApp, item.screen, "BaseScreenID");
  } else if (item.type === "external") {
    window.open(item.url, "_blank");
  }
};

export default QuickLinksWidget;
