import React, { useEffect, useState, useCallback } from "react";
import "../Common/CommonFunctions";
import Header from "../Screens/Header";
import "../Styles/index.css";
import SidebarComp from "../Screens/Sidebar";
import { Popover, Modal, ScreenLoader } from "shared-services";
import LoginBackground from "shared-services/src/Images/LoginBackground.jpg";
const AlertMsg = window.AlertMsg;

function BaseScreen() {
  const [showHeader, setShowHeader] = useState(true);
  const [showSideBar, setShowSideBar] = useState(false);
  const [loader, setLoader] = useState(false);
  // const timeout = 6000; // 1 minute
  // const lastActivityTime = useRef(Date.now());
  // const intervalRef = useRef(null);
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
    closeBtn: false,
  });

  window.showPopover = showPopover;
  window.hidePopover = hidePopover;
  window.showAlert = showAlert;
  window.setLoader = setLoader;
  useEffect(() => {
    window.setShowHeader = setShowHeader;
    window.setShowSideBar = setShowSideBar;
    window.setModalData = setModalData;
    console.log("BaseScreen script loaded and function executed!");
    window.launchMicroApp("login", "LoginPage", "BaseScreenID");
  }, []);

  // useEffect(() => {
  //   const updateActivity = () => {
  //     lastActivityTime.current = Date.now();
  //   };
  //   const checkInactivity = () => {
  //     if (Date.now() - lastActivityTime.current > timeout) {
  //       window.showAlert({
  //         AlertType: "E",
  //         AlertDesc: "Session expired due to inactivity.",
  //         Btns: [
  //           {
  //             Name: "Ok",
  //             function: () => "",
  //             // window.location.href = "/login"
  //           },
  //         ],
  //       });
  //       //localStorage.clear();
  //       document.cookie = "token=; Max-Age=0";
  //     }
  //   };
  //   const events = [
  //     "mousemove",
  //     "keydown",
  //     "mousedown",
  //     "scroll",
  //     "touchstart",
  //   ];
  //   events.forEach((event) => {
  //     //window.addEventListener(event, updateActivity);
  //     document.addEventListener(event, updateActivity);
  //   });
  //   intervalRef.current = setInterval(checkInactivity, 5000); // Check every 5 sec
  //   return () => {
  //     events.forEach((event) => {
  //       //window.removeEventListener(event, updateActivity);
  //       document.removeEventListener(event, updateActivity);
  //     });
  //     clearInterval(intervalRef.current);
  //   };
  // }, []);
  return (
        <div
          className="min-h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${LoginBackground})` }} // Replace with actual image path
        >
          <div className="flex flex-col h-screen">
            {/* Header stays up top */}
            <div id="BaseHeaderElm" className="flex-none">
              {showHeader === true && <Header />}
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div id="SideBarEmlId" className="overflow-y-auto scrollbar-thin">
                {showSideBar === true && <SidebarComp />}
              </div>

              <div
                id="BaseScreenID"
                className="flex-1 overflow-x-hidden overflow-y-auto p-4 shadow dark:bg-neutral-800  dark:shadow-[0_2px_8px_rgba(255,255,255,0.05)] transition-all duration-300"
              ></div>
            </div>
            <div id="AuthModalId"></div>
            <AlertMsg
              AlertType={alertData.AlertType}
              AlertDesc={alertData.AlertDesc}
              Btns={alertData.Btns}
              isOpen={alertData.isOpen}
              setIsOpen={(val) =>
                setAlertData((prev) => ({ ...prev, isOpen: val }))
              }
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
            {loader && <ScreenLoader />}
          </div>
        </div>
  );
}

export default BaseScreen;
