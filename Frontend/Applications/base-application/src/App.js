import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import config from "../src/Configuration/MicroAppConfig.json";
import MicroFrontendWrapper from "../src/Common/MicroFrontendWrapper";

function App() {
  return (
    <Router>
      <Routes>
        {Object.entries(config).map(([key, { route, remoteUrl, scope, module }]) => (
          <Route
            key={key}
            path={route}
            element={
              <Suspense fallback={<div>Loading {key}...</div>}>
                <MicroFrontendWrapper
                  remoteUrl={remoteUrl}
                  scope={scope}
                  module={module}
                />
              </Suspense>
            }
          />
        ))}
        <Route path="/prelogin" element={<Navigate to="/login" />} />
        <Route path="*" element={<div>404 - Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
