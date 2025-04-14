import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import config from "./Configuration/MicroAppConfig.json";
import MicroFrontendWrapper from "./Common/MicroFrontendWrapper";
import { launchMicroApp } from "./Common/MicroAppLauncher";

const DynamicRoute = ({ appId }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const screen = searchParams.get("screen") || "";
  const { remoteUrl, scope, module } = config[appId];

  return (
    <Suspense fallback={<div>Loading {appId}...</div>}>
      <MicroFrontendWrapper
        remoteUrl={remoteUrl}
        scope={scope}
        module={module}
        screen={screen}
      />
    </Suspense>
  );
};

function App() {
  return (
    <div>
      <h2>Micro App Launcher</h2>
      <button
        onClick={() =>
          launchMicroApp("login", "LoginPage", "microAppRoot", {
            userId: "123",
            theme: "dark",
          })
        }
      >
        Launch Login Page
      </button>
      <button
        onClick={() =>
          launchMicroApp("login", "RegistrationPage", "microAppRoot2")
        }
      >
        Launch Registration Page
      </button>

      <div
        id="microAppRoot"
        style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }}
      >
        {/* MicroApp will mount here */}
      </div>
      <div
        id="microAppRoot2"
        style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }}
      >
        {/* MicroApp will mount here */}
      </div>
    </div>
  );
}

export default App;
