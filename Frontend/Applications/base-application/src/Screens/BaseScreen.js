import React, { useEffect, useState, useCallback, useRef } from "react";
import { launchMicroApp } from "../Common/CommonFunctions";
import Header from "../Screens/Header";
import "../Styles/index.css";
import SidebarComp from "../Screens/Sidebar";
import { Popover, Modal } from "shared-services";
const AlertMsg = window.AlertMsg;

function BaseScreen() {
  const [showHeader, setShowHeader] = useState(true);
  const [showSideBar, setShowSideBar] = useState(false);
  const btnRef = useRef();
  const { PopoverUI, showPopover, hidePopover } = Popover();
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
  const [ModalData, setModalData] = useState({
    ModalTitle: "",
    ModalChildren: "",
    Btns: [],
    isOpen: false,
    closeBtn: false
  });
  useEffect(() => {
    window.showAlert = showAlert;
    window.setShowHeader = setShowHeader;
    window.setShowSideBar = setShowSideBar;
    window.showPopover = showPopover;
    window.hidePopover = hidePopover;
    window.setModalData = setModalData;
    console.log("BaseScreen script loaded and function executed!");
    window.launchMicroApp("login", "LoginPage", "BaseScreenID");
  }, []);
  return (
    <div className="flex flex-col h-screen">
      {/* Header stays up top */}
      <div id="BaseHeaderElm" className="flex-none">
        {showHeader === true && <Header />}
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div id="SideBarEmlId" className="overflow-y-auto scrollbar-thin">
          {showSideBar == true && <SidebarComp />}
        </div>

        <div
          id="BaseScreenID"
          className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-4"
        ></div>
      </div>
      <div id="AuthModalId"></div>
      <AlertMsg
        AlertType={alertData.AlertType}
        AlertDesc={alertData.AlertDesc}
        Btns={alertData.Btns}
        isOpen={alertData.isOpen}
        setIsOpen={(val) => setAlertData((prev) => ({ ...prev, isOpen: val }))}
      />
      <Modal
        isOpen={ModalData.isOpen}
        title={ModalData.ModalTitle}
        Btns={ModalData.Btns}
        closeBtn={ModalData.closeBtn}
      >
        {ModalData.ModalChildren}
      </Modal>
      <PopoverUI />
    </div>
  );
}

export default BaseScreen;
