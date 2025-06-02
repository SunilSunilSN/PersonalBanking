import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Tabs({ tabs = [] }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full mx-auto">
      {/* Tab Buttons with animated box */}
      <div className="relative flex bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`relative z-10 px-4 py-2 text-sm font-medium rounded-xl  ${
                isActive ? "text-white" : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-600 rounded-xl z-[-1]"
                  transition={{
                    type: "spring",
                    stiffness: 900,
                    damping: 20,
                  }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Area */}
      <div className="relative overflow-hidden h-[650px] mt-4 bg-white p-4 rounded-xl shadow">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              type: "spring",
              stiffness: 900,
              damping: 20,
            }}
            className="h-full"
          >
            {tabs[activeTab].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
