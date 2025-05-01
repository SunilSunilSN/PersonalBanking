import React from "react";
import { launchMicroApp } from "../Common/CommonFunctions";
import Header from "../Screens/Header";
import Sidebar from "../Screens/Sidebar";
import "../Styles/index.css";
function BaseScreen() {
  return (
    <div>
      {/* Header stays up top */}
      <div id="BaseHeaderElm">
        <Header />
      </div>
      <div id="BaseScreenID ">
      <div id="LoginId"></div>
        <div id="LoginId"></div>
      </div>
    </div>
  );
}

export default BaseScreen;
