import React, { useEffect, useState, useCallback,useRef } from "react";
import { launchMicroApp } from "../Common/CommonFunctions";
import Header from "../Screens/Header";
import "../Styles/index.css";
import SidebarComp from "../Screens/Sidebar";
import { Popover } from "shared-services";
const AlertMsg = window.AlertMsg;

function BaseScreen() {
  const [showHeader, setShowHeader] = useState(true);
  const [showSideBar, setShowSideBar] = useState(false);
  const btnRef = useRef();
  const { PopoverUI, showPopover, hidePopover} = Popover();
  const [alertData, setAlertData] = useState({
    AlertType: "",
    AlertDesc: "",
    Btns: [],
    isOpen: false,
  });
  const showAlert = useCallback(({ AlertType, AlertDesc, Btns }) => {
    setAlertData({
      AlertDesc,
      AlertType,
      Btns,
      isOpen: true,
    });
  }, []);
  useEffect(() => {
    window.showAlert = showAlert;
    window.setShowHeader = setShowHeader;
    window.setShowSideBar = setShowSideBar;
    window.showPopover = showPopover;
    window.hidePopover = hidePopover;
    console.log("BaseScreen script loaded and function executed!");
    window.launchMicroApp("login", "LoginPage", "BaseScreenID");
  }, []);
  return (
    <div>
      {/* Header stays up top */}
      <div id="BaseHeaderElm">{showHeader === true && <Header />}</div>
      <div id="SideBarEmlId">{showSideBar == true && <SidebarComp />}</div>
      <div id="BaseScreenID" ></div>
      <AlertMsg
        AlertType={alertData.AlertType}
        AlertDesc={alertData.AlertDesc}
        Btns={alertData.Btns}
        isOpen={alertData.isOpen}
        setIsOpen={(val) => setAlertData((prev) => ({ ...prev, isOpen: val }))}
      />
      <PopoverUI/>
    </div>
  );
}

export default BaseScreen;
