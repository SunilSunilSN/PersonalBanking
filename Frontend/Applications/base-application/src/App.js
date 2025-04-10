import React from "react";
import { DynamicAppLoad } from "./Common/DynamicAppLoad"; // Adjust path as per your setup

function App() {
  const loginConfig = {
    url: "http://localhost:3000/remoteEntry.js",
    scope: "login_app",
    module: "./LoginPage",
  };

  return (
    <div>
      <h1>Base Application</h1>
      <DynamicAppLoad config={loginConfig} />
    </div>
  );
}

export default App;
