import React from "react";
import BaseScreen from "./Screens/BaseScreen";
import './Styles/index.css';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";
// import config from "./Configuration/MicroAppConfig.json";
// import MicroFrontendWrapper from "./Common/MicroFrontendWrapper";

// const DynamicRoute = ({ appId }) => {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const screen = searchParams.get("screen") || "";
//   const { remoteUrl, scope, module } = config[appId];

//   return (
//     <Suspense fallback={<div>Loading {appId}...</div>}>
//       <MicroFrontendWrapper
//         remoteUrl={remoteUrl}
//         scope={scope}
//         module={module}
//         screen={screen}
//       />
//     </Suspense>
//   );
// };

function App() {
  return (
    <div>
      <h2>Base Application</h2>
      <BaseScreen />
    </div>
  );
}

export default App;
