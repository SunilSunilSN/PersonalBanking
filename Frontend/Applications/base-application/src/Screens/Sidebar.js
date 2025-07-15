import React, { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "shared-services";
import {
  Cog8ToothIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/20/solid";
import * as IconsMap from "@heroicons/react/20/solid";
const Logout = IconsMap["ArrowLongLeftIcon"];

const SidebarComp = () => {
  const [sideBarItems, setSideBarItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const fetchSidebarData = async () => {
    const data = await window.getCommonData(["Post-Login-SideBar"]);
    const SideBarData = data.find((item) => item.Key === "Post-Login-SideBar");
    if (SideBarData && SideBarData.Value) {
      const sideBars = SideBarData.Value.filter(
        (visib) =>
          visib.Visible === window.getDeviceType() || visib.Visible === "Both"
      );
      if (sideBars) setSideBarItems(sideBars);
    }
  };
  const callLogout = async () => {
    const data = await window.ServerCall("logoutAPI", "");
    if (data.success) {
      //window.launchMicroApp("login", "LoginPage", "BaseScreenID");
      window.location.reload();
    }
  };
  const SideParPopup = (PopoItems) => {
    const PItems = PopoItems.filter(
      (visible) =>
        visible.Visible === window.getDeviceType() || visible.Visible === "Both"
    );
    if (PItems) {
      return (
        <div>
          {PItems.map((item, index) => {
            const IconComponent = IconsMap[item.Icon];
            return (
              <SidebarItem
                key={index}
                onClick={(e) => {
                  window.launchMicroApp(
                    item.Navigate.MicroApp,
                    item.Navigate.Screen,
                    "BaseScreenID"
                  );
                }}
              >
                <IconComponent className="w-5 h-5" />
                <SidebarLabel>{item.PopName}</SidebarLabel>
              </SidebarItem>
            );
          })}
        </div>
      );
    }
  };
  const Clickfunc = (target, item, index) => {
    if (item.Type === "Navigate") {
      return window.launchMicroApp(
        item.Navigate.MicroApp,
        item.Navigate.Screen,
        "BaseScreenID"
      );
    } else if (item.Type === "Popover") {
      return window.showPopover(target, SideParPopup(item.PopItems), "right");
    }
  };
  useEffect(() => {
    fetchSidebarData(); // ✅ call inside useEffect
  }, []);
  return (
    <Sidebar
      className={`${
        isExpanded ? "w-64 z-[9999] " : "w-16 z-[9999]"
      } transition-all duration-300 overflow-hidden`}
    >
      <SidebarBody>
        <SidebarSection>
          <SidebarItem onClick={() => setIsExpanded((prev) => !prev)}>
            {isExpanded ? (
              <ChevronDoubleLeftIcon className="w-5 h-5 flex-shrink-0" />
            ) : (
              <ChevronDoubleRightIcon className="w-5 h-5 flex-shrink-0" />
            )}
            <SidebarLabel
              className={`relative ml-2 whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                isExpanded
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              Nav Bar
            </SidebarLabel>
          </SidebarItem>
        </SidebarSection>
        <SidebarSpacer />
        <SidebarSection>
          {sideBarItems.map((item, index) => {
            const IconComponent = IconsMap[item.Icon];
            return (
              <SidebarItem
                key={index}
                onClick={(e) => {
                  Clickfunc(e, item, index);
                }}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <SidebarLabel
                  className={`ml-2 whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                    isExpanded
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {item.Name}
                </SidebarLabel>
              </SidebarItem>
            );
          })}
        </SidebarSection>
        <SidebarSpacer />
        <SidebarSection>
          <SidebarItem
            onClick={() =>
              window.showAlert({
                AlertType: "W",
                AlertDesc: "Are you Sure Want to Logout?",
                Btns: [
                  {
                    Name: "Ok",
                    function: () => callLogout(),
                  },
                ],
              })
            }
          >
            <Logout className="w-5 h-5 flex-shrink-0" />
            <SidebarLabel
              className={`ml-2 whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                isExpanded
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              Logout
            </SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  );
};

export default SidebarComp;
