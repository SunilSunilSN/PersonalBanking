import React, { useState, useEffect } from "react";
import { Avatar } from "shared-services";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "shared-services";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "shared-services";
import * as IconsMap from "@heroicons/react/20/solid";
import ArrowLongLeftIcon from "@heroicons/react/20/solid";
const Logout = IconsMap["ArrowLongLeftIcon"];

const SidebarComp = () => {
  const [sideBarItems, setSideBarItems] = useState([]);
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
      window.launchMicroApp("login", "LoginPage", "BaseScreenID");
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
      return window.showPopover(target, SideParPopup(item.PopItems));
    }
  };
  useEffect(() => {
    fetchSidebarData(); // ✅ call inside useEffect
  }, []);
  return (
    <Sidebar>
      <SidebarBody>
        <SidebarSection>
          {sideBarItems.map((item, index) => {
            const IconComponent = IconsMap[item.Icon];
            return (
              <SidebarItem
                key={index}
                onClick={(e) => {
                  Clickfunc(e, item, index);
                  // window.showPopover(e, SideParPopup())
                }}
              >
                <IconComponent className="w-5 h-5" />
                <SidebarLabel>{item.Name}</SidebarLabel>
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
            <Logout className="w-5 h-5" />
            <SidebarLabel>Logout</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>
    </Sidebar>
  );
};

export default SidebarComp;
