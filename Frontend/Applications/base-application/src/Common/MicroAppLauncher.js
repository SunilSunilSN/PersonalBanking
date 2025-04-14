// src/Common/common.js
import config from "../Configuration/MicroAppConfig.json";
import MicroFrontendWrapper from "./MicroFrontendWrapper";
import React from "react";
import { createRoot } from "react-dom/client";

export const launchMicroApp = (appId, screenId, targetElementId, extraParams = {}) => {
  const app = config[appId];
  if (!app) {
    console.error(`❌ No microapp found with appId: ${appId}`);
    return;
  }

  const container = document.getElementById(targetElementId);
  if (!container) {
    console.error(`❌ No DOM element found with ID: ${targetElementId}`);
    return;
  }

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <MicroFrontendWrapper
        remoteUrl={app.remoteUrl}
        scope={app.scope}
        module={app.module}
        screen={screenId}
        extraParams={extraParams}
      />
    </React.StrictMode>
  );
};
window.launchMicroApp = launchMicroApp;