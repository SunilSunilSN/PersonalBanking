import React, { useEffect } from "react";
import { launchMicroApp } from "../Common/CommonFunctions";
import Header from "../Screens/Header";
import Sidebar from "../Screens/Sidebar";
import "../Styles/index.css";
function BaseScreen() {
  useEffect(() => {
    console.log("BaseScreen script loaded and function executed!");
    window.launchMicroApp("login", "LoginPage", "LoginId");
  }, []);
  return (
    <div>
      {/* Header stays up top */}
      <div id="BaseHeaderElm">
        <Header />
      </div>
      <div id="BaseScreenID ">
        <div
          id="LoginId"
          className="flex justify-center border mr-[20%] mb-[0%] mt-[5%] ml-[60%] rounded-md shadow py-10"
        ></div>
      </div>
    </div>
  );
}

export default BaseScreen;
