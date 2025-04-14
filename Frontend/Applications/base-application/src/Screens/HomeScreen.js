// src/Pages/HomeScreen.js
import React from "react";
import { useMicroAppLauncher } from "../Common/MicroAppLauncher";

function HomeScreen() {
  const { launchMicroApp } = useMicroAppLauncher();

  return (
    <div>
      <h2>Home</h2>
      <button onClick={() => launchMicroApp("login", "LoginPage")}>
        Go to Login
      </button>
      <button onClick={() => launchMicroApp("login", "RegistrationPage")}>
        Go to Registration
      </button>
    </div>
  );
}

export default HomeScreen;
