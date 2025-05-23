// src/Common/common.js
import config from "../Configuration/MicroAppConfig.json";
import MicroFrontendWrapper from "./MicroFrontendWrapper";
import React from "react";
import { createRoot } from "react-dom/client";
import { ErrorMessageConfig } from "shared-services";
import { APIConfig } from "../Configuration/APIConfig";
import {
  Button,
  Alert,
  AlertDescription,
  AlertActions,
  AlertTitle,
} from "shared-services";
const launchMicroApp = (appId, screenId, targetElementId, extraParams = {}) => {
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
const errorDisplay = (setErrors, e, fieldName) => {
  let value;
  let type;
  if (e?.current) {
    value = e.current.value;
    type = e.current.dataset.type;
  } else {
    value = e.currentTarget.value;
    type = e.currentTarget.dataset.type;
  }
  const errorNode = ErrorMessageConfig[type];
  if (!errorNode) return false;
  const regex = new RegExp(errorNode.Regex);
  const isEmpty = value.trim().length === 0;
  const isValid = regex.test(value);
  if (isEmpty) {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorNode.NullMessage || "This field is required",
    }));
    return true;
  }
  if (!isValid) {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: errorNode.ErrorMessage,
    }));
    return true;
  }
  setErrors((prev) => ({
    ...prev,
    [fieldName]: "",
  }));
};
const errorDisplayAll = (refsObj, setErrors) => {
  let hasError = false;
  Object.entries(refsObj).forEach(([key, ref]) => {
    if (ref.ref.current) {
      const type = ref.ref.current.dataset.type;
      const value = ref.ref.current.value.trim();
      const config = ErrorMessageConfig[type];
      if (config) {
        const regex = new RegExp(config.Regex);
        if (!value) {
          setErrors((prev) => ({
            ...prev,
            [ref.field]: config.NullMessage,
          }));
          hasError = true;
        } else if (!regex.test(value)) {
          setErrors((prev) => ({
            ...prev,
            [ref.field]: config.ErrorMessage,
          }));
          hasError = true;
        } else {
          setErrors((prev) => ({
            ...prev,
            [ref.field]: "",
          }));
        }
      }
    }
  });
  return hasError;
};
const errorOnClick = (setErrors, e, fieldName) => {
  setErrors((prev) => ({
    ...prev,
    [fieldName]: "",
  }));
};
const ServerCall = async (ApiName, body) => {
  const APIDetails = APIConfig[ApiName];
  if (!APIDetails) throw new Error(`API config for ${ApiName} not found`);
  const options = {
    method: APIDetails.method,
    headers: APIDetails.headers,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const baseUrl = process.env.REACT_APP_BACKEND_URL || "";
  const service = process.env[APIDetails.service] || "";
  const url = `${baseUrl}${service}${APIDetails.enpointurl}`;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
const AlertMsg = ({ AlertTit, AlertDesc, Btns, isOpen, setIsOpen }) => {
  return (
    <>
      <Alert open={isOpen} onClose={setIsOpen}>
        <AlertTitle>{AlertTit}</AlertTitle>
        <AlertDescription>{AlertDesc}</AlertDescription>
        <AlertActions>
          <Button
            onClick={() => {
              setIsOpen(false);
              Btns[0].function?.();
            }}
          >
            {Btns[0].Name}
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
              Btns[1].function?.();
            }}
          >
            {Btns[1].Name}
          </Button>
        </AlertActions>
      </Alert>
    </>
  );
};
window.launchMicroApp = launchMicroApp;
window.getCommonData = getCommonData;
window.getDeviceType = getDeviceType;
window.errorDisplay = errorDisplay;
window.errorDisplayAll = errorDisplayAll;
window.errorOnClick = errorOnClick;
window.ServerCall = ServerCall;
window.AlertMsg = AlertMsg;
