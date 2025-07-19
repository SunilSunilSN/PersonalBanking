import React, { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarBody,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from "shared-services";
import * as IconsMap from "lucide-react";
const Logout = IconsMap["LogOut"];
const NavLeftIcon = IconsMap["ChevronsLeft"];
const NavRightIcon = IconsMap["ChevronsRight"];
const ChevronDown = IconsMap["ChevronDown"];
const ChevronUp = IconsMap["ChevronUp"];
const getLucideIcon = (iconName) => {
  if (!iconName) return IconsMap["HelpCircle"];
  const name = iconName.replace(/Icon$/, "");
  return IconsMap[name] || IconsMap["HelpCircle"];
};
const SidebarComp = () => {
  const [sideBarItems, setSideBarItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobDrop, setMobDrop] = useState(false);
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
            const IconComponent = getLucideIcon(item.Icon);
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
                <IconComponent className="w-5 h-5 dark:hover:text-blue-600 hover:text-blue-600" />
                <SidebarLabel>{item.PopName}</SidebarLabel>
              </SidebarItem>
            );
          })}
        </div>
      );
    }
  };
  const SideBarDrop = (PopoItems) => {
    const PItems = PopoItems.filter(
      (visible) =>
        visible.Visible === window.getDeviceType() || visible.Visible === "Both"
    );
    return (
      <div className="mt-2 space-y-2 lg:hidden ml-8">
        {PItems.map((item, index) => {
          const IconComponent = getLucideIcon(item.Icon);
          return (
            <div
              key={index}
              className="py-2 cursor-pointer flex gap-2 min-w-0 px-2 py-1 rounded text-sm font-medium dark:text-white dark:hover:text-blue-600 dark:hover:bg-blue-600/10 hover:bg-gray-200 "
              onClick={(e) => {
                window.launchMicroApp(
                  item.Navigate.MicroApp,
                  item.Navigate.Screen,
                  "BaseScreenID"
                );
              }}
            >
              <IconComponent className="w-5 h-5 flex-shrink-0 " />
              <div className="text-sm text-gray-500 dark:text-gray-500 uppercase transition-all duration-300 ease-in-out dark:hover:text-blue-600 hover:text-blue-600">
                {item.PopName}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  const Clickfunc = (target, item, index) => {
    const SideBarWid = target.target
      .closest("aside")
      .getBoundingClientRect().width;
    
    if (item.Type === "Navigate") {
      setIsExpanded(false);
      return window.launchMicroApp(
        item.Navigate.MicroApp,
        item.Navigate.Screen,
        "BaseScreenID"
      );
    } else if (item.Type === "Popover" && SideBarWid !== window.innerWidth) {
      return window.showPopover(target, SideParPopup(item.PopItems), "right");
    } else {
      setMobDrop(!mobDrop);
      
    }
  };
  useEffect(() => {
    fetchSidebarData(); // ✅ call inside useEffect
  }, []);
  return (
    <Sidebar
      className={`${
        isExpanded ? "w-screen lg:w-64 z-[9999] " : "w-16 z-[9999]"
      } transition-all duration-300 overflow-hidden`}
    >
      <SidebarBody>
        <SidebarSection>
          <SidebarItem onClick={() => setIsExpanded((prev) => !prev)}>
            {isExpanded ? (
              <NavLeftIcon className="w-5 h-5 flex-shrink-0" />
            ) : (
              <NavRightIcon className="w-5 h-5 flex-shrink-0" />
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
            const IconComponent = getLucideIcon(item.Icon);
            return (
              <>
                <SidebarItem
                  key={index}
                  onClick={(e) => {
                    Clickfunc(e, item, index);
                  }}
                  className={`${
                    isExpanded ? "hover:bg-gray-200" : "hover:none"
                  }`}
                >
                  <IconComponent className={`w-5 h-5 flex-shrink-0`} />
                  <SidebarLabel
                    className={`ml-2 whitespace-nowrap transition-all duration-300 ease-in-out transform dark:hover:text-blue-600 hover:text-blue-600 ${
                      isExpanded
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    {item.Name}
                  </SidebarLabel>
                  {isExpanded &&
                    item.Type === "Popover" &&
                    (mobDrop ? (
                      <ChevronUp className="w-5 h-5 flex-shrink-0 lg:hidden" />
                    ) : (
                      <ChevronDown className="w-5 h-5 flex-shrink-0 lg:hidden" />
                    ))}
                </SidebarItem>
                {isExpanded &&
                  item.Type === "Popover" &&
                  mobDrop &&
                  SideBarDrop(item.PopItems)}
              </>
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
