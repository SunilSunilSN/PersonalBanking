// src/Common/common.js
import MicroFrontendWrapper from "./MicroFrontendWrapper";
import React from "react";
import { createRoot } from "react-dom/client";
import { ErrorMessageConfig } from "shared-services";
import { AlertCircle } from "lucide-react";
import {
  Button,
  Alert,
  AlertDescription,
  AlertActions,
  AlertTitle,
} from "shared-services";
const rootCache = new Map();
const launchMicroApp = async (appId, screenId, targetElementId, extraParams = {}) => {
  window.hidePopover();
  let app = {}; 
  const data = await getCommonData("MicroAppConfigs");
  const env = process.env.REACT_APP_ENV;
  const config = data?.[0]?.Value?.find(elm => elm?.[env])?.[env];
    app = config[appId];
    if (!app) {
    console.error(`❌ No microapp found with appId: ${appId}`);
    return;
  }
  // const app = config[appId];
  const container = document.getElementById(targetElementId);
  if (!container) {
    console.error(`❌ No DOM element found with ID: ${targetElementId}`);
    return;
  }

  let root = rootCache.get(container);
  if (!root) {
  root = createRoot(container);
    rootCache.set(container, root);
  }
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
      credentials: "include",
      body: JSON.stringify({
        Key: AllKeys,
      })
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
const getAPIConfig = async () => {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_USERMANGMENT_MICROSERICE}/user/getAPIConfig`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("❌ Error in getAPI Configs:", error);
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
  const APIConfig = await getAPIConfig();
  const APIDetails = APIConfig.find((el) => el["APIConfigurations"])
    .APIConfigurations[ApiName];
  if (!APIDetails) throw new Error(`API config for ${ApiName} not found`);
  const options = {
    method: APIDetails.method,
    headers: APIDetails.headers,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  if (APIDetails.credentials) {
    options.credentials = "include";
  }
  const baseUrl = process.env.REACT_APP_BACKEND_URL || "";
  const service = process.env[APIDetails.service] || "";
  const url = `${baseUrl}${service}${APIDetails.enpointurl}`;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};
const WorkFlowCall = async (WorkFlowName, Step, body, callBack) => {
  const WorkFlowConfig = await getAPIConfig();
  const WorkFlowDetails = WorkFlowConfig.find(
    (el) => el["WorkFlowConfiguration"]
  ).WorkFlowConfiguration[WorkFlowName];
  if (!WorkFlowDetails)
    throw new Error(`Workflow config for ${WorkFlowName} not found`);

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  };
  body.WorkFlowId = WorkFlowName;
  body.Step = Step;
  if (body) {
    options.body = JSON.stringify(body);
  }

  const url = `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_USERMANGMENT_MICROSERICE}/user/WorkFlowCall`;
  const response = await fetch(url, options);
  const data = await response.json();
  callBack(data);
};
const AlertMsg = ({ AlertType, AlertDesc, Btns = [], isOpen, setIsOpen }) => {
  const alertMap = {
    E: {
      AlertTitle: "Error!",
      AlertClass: "text-red-500",
      AlterIcon: AlertCircle,
    },
    S: {
      AlertTitle: "Success!",
      AlertClass: "text-green-500",
      AlterIcon: AlertCircle,
    },
    W: {
      AlertTitle: "Warning!",
      AlertClass: "text-yellow-500",
      AlterIcon: AlertCircle,
    },
    I: {
      AlertTitle: "Info",
      AlertClass: "text-blue-500",
      AlterIcon: AlertCircle,
    },
  };
  const alertDetails = alertMap[AlertType] || {
    AlertTitle: "Alert",
    AlertClass: "",
    AlterIcon: "",
  };
  const Icon = alertDetails.AlterIcon;
  return (
    <>
      <Alert open={isOpen} onClose={() => setIsOpen(false)}>
        <AlertTitle className={alertDetails.AlertClass} Icon={Icon}>
          {" "}
          {alertDetails.AlertTitle}
        </AlertTitle>
        <AlertDescription>{AlertDesc}</AlertDescription>
        <AlertActions>
          {Btns.map((btn, idx) => (
            <Button
              key={idx}
              onClick={() => {
                setIsOpen(false);
                btn.function?.();
              }}
            >
              {btn.Name}
            </Button>
          ))}
        </AlertActions>
      </Alert>
    </>
  );
};
const AuthFunctions = ({ onSuccessFn, onCancelFn, onFailureFn, action }) => {
  if (!window.AuthFuncsStore) {
    window.AuthFuncsStore = {
      onSuccess: () => {},
      onCancel: () => {},
      onFailure: () => {},
    };
  }
  if (action === "SET") {
    window.AuthFuncsStore = {
      onSuccess: onSuccessFn || (() => {}),
      onCancel: onCancelFn || (() => {}),
      onFailure: onFailureFn || (() => {}),
    };
  } else if (action === "GET") {
    return window.AuthFuncsStore;
  }
};
window.launchMicroApp = launchMicroApp;
window.getCommonData = getCommonData;
window.getDeviceType = getDeviceType;
window.errorDisplay = errorDisplay;
window.errorDisplayAll = errorDisplayAll;
window.errorOnClick = errorOnClick;
window.ServerCall = ServerCall;
window.AlertMsg = AlertMsg;
window.WorkFlowCall = WorkFlowCall;
window.AuthFunctions = AuthFunctions;
