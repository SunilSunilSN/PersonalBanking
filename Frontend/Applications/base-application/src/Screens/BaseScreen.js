import React from "react";
import { launchMicroApp } from "../Common/CommonFunctions";
import Header from "../Screens/Header";
import Sidebar from "../Screens/Sidebar";

function BaseScreen() {
  return (
    <div>
      {/* Header stays up top */}
      <div id="BaseHeaderElm">
        <Header />
      </div>
      <div className="bg-green-500 text-white p-4 rounded">
  Tailwind is now working! 🌟
</div>

      {/* Sidebar + Main content side by side on md+ screens */}
      <div className="md:flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="p-4 md:ml-64 w-full">
          <h2 className="text-xl font-bold mb-4">Home</h2>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
            onClick={() =>
              launchMicroApp("login", "RegistrationPage", "microAppRoot2")
            }
          >
            Go to Login
          </button>

          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            onClick={() =>
              launchMicroApp("login", "LoginPage", "microAppRoot2")
            }
          >
            Go to Registration
          </button>

          <div id="microAppRoot2" className="mt-6" />
        </div>
      </div>
    </div>
  );
}

export default BaseScreen;
