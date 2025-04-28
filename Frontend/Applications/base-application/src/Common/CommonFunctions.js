// src/Common/common.js
import config from "../Configuration/MicroAppConfig.json";
import MicroFrontendWrapper from "./MicroFrontendWrapper";
import React from "react";
import { createRoot } from "react-dom/client";

export const launchMicroApp = (
  appId,
  screenId,
  targetElementId,
  extraParams = {}
) => {
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
const getCommonData = async (AllKeys) => {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_USERMANGMENT_MICROSERICE}/user/getCommonData`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Key: AllKeys,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("❌ Error in getCommonData:", error);
    throw error;
  }
};
const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes("mobile")) {
    return "Mobile";
  } else if (userAgent.includes("tablet")) {
    return "Tablet";
  } else {
    return "Web";
  }
};
window.launchMicroApp = launchMicroApp;
window.getCommonData = getCommonData;
window.getDeviceType = getDeviceType;
