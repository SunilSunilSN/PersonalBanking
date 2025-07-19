import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
  SidebarItem,
  SidebarLabel,
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownLabel,
  DropdownButton,
} from "shared-services";
import {
  InboxIcon,
  BellAlertIcon,
  Cog8ToothIcon,
} from "@heroicons/react/20/solid";
import * as IconsMap from "lucide-react";
import { AlignRight, User, SunMoon, BellRing, Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
const getLucideIcon = (iconName) => {
  if (!iconName) return IconsMap["HelpCircle"];
  const name = iconName.replace(/Icon$/, "");
  return IconsMap[name] || IconsMap["HelpCircle"];
};
function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const classList = document.documentElement.classList;
    if (isDark) {
      classList.add("dark");
    } else {
      classList.remove("dark");
    }
  }, [isDark]);
  const [headerItems, setHeaderItems] = useState({
    List: [],
    IsLoggedIn: false,
    userData: {},
  });
  const fetchHeaderData = async () => {
    const data = await window.getCommonData([
      "Sunil",
      "Sunil1",
      "Pre-Login-Header",
    ]);

    const PreLoginHeader = data.find((item) => item.Key === "Pre-Login-Header");
    if (PreLoginHeader && PreLoginHeader.Value) {
      const headers = PreLoginHeader.Value.filter(
        (visib) =>
          visib.Visible === window.getDeviceType() || visib.Visible === "Both"
      );
      if (headers)
        setHeaderItems({ List: headers, IsLoggedIn: false, userData: {} });
    }
  };
  const HeaderPopup = (PopoItems) => {
    const PItems = PopoItems.filter(
      (visible) =>
        visible.Visible === window.getDeviceType() || visible.Visible === "Both"
    );
    if (PItems) {
      return (
        <div className="">
          {PItems.map((item, index) => {
            const IconComponent = getLucideIcon(item.Icon);
            return (
              <button
              key={index}
                onClick={(e) => {window.launchMicroApp(
                  item.Navigate.MicroApp,
                  item.Navigate.Screen,
                  "BaseScreenID"
                )}}
                className="flex w-full text-left text-sm hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-100 items-center"
              >
                <IconComponent className="w-5 h-5 flex-shrink-0" />
                <div
                  className={
                    "px-4 py-2 text-xs text-gray-400 uppercase"
                  }
                >
                  {item.Name}
                </div>
              </button>
              // <SidebarItem
              //   key={index}
              //   onClick={(e) => {
              //     window.launchMicroApp(
              //       item.Navigate.MicroApp,
              //       item.Navigate.Screen,
              //       "BaseScreenID"
              //     );
              //   }}
              // >
              //   <IconComponent className="w-5 h-5 flex-shrink-0" />
              //   <SidebarLabel>{item.Name}</SidebarLabel>
              // </SidebarItem>
            );
          })}
        </div>
      );
    }
  };
  const Clickfunc = (target, item, allign) => {
    if (item.Type === "Navigate") {
      return window.launchMicroApp(
        item.Navigate.MicroApp,
        item.Navigate.Screen,
        "BaseScreenID"
      );
    } else if (item.Type === "Popover") {
      return window.showPopover(
        target,
        HeaderPopup(item.PopItems),
        allign ? allign : "bottom"
      );
    }
  };
  useEffect(() => {
    fetchHeaderData();
    window.setHeaderItems = setHeaderItems;
    // ✅ call inside useEffect
  }, []);

  return (
    <Navbar>
      <NavbarLabel>Personal Banking Application</NavbarLabel>
      <NavbarDivider className="lg:hidden" />
      <NavbarSection className="hidden lg:flex">
        {headerItems.List.map((item, index) => (
          <NavbarItem key={index} onClick={(e) => Clickfunc(e, item, index)}>
            {item.Name}
          </NavbarItem>
        ))}
      </NavbarSection>
      <NavbarSection className="flex items-center justify-start lg:hidden">
        <div className="">
          <Dropdown>
            {({ setOpen }) => (
              <>
                {/* <DropdownMenu className="min-w-64" anchor="bottom start"> */}
                {headerItems.List.map((item, index) => {
                  const IconComponent = getLucideIcon(item.Icon);
                  return (
                    <DropdownItem
                      className={"items-center"}
                      key={index}
                      onClick={(e) => {
                        Clickfunc(e, item, "right");
                        item.Type === "Popover"
                          ? setOpen(true)
                          : setOpen(false);
                      }}
                    >
                      <IconComponent className="w-5 h-5 flex-shrink-0" />
                      <DropdownLabel>{item.Name}</DropdownLabel>
                      {/* {item.Name} */}
                    </DropdownItem>
                  );
                })}
                {/* </DropdownMenu> */}
              </>
            )}
          </Dropdown>
        </div>
      </NavbarSection>
      <NavbarSpacer />
      {headerItems.IsLoggedIn && (
        <>
          <NavbarSection className="hidden lg:flex">
            <NavbarItem href="/search" aria-label="Search">
              <BellRing className="w-5 h-5 flex-shrink-0" />
            </NavbarItem>
            <NavbarItem
              onClick={() =>
                window.launchMicroApp("login", "ProfilePage", "BaseScreenID")
              }
              aria-label="Search"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Avatar
                  src={headerItems.userData["ProfilePic"]}
                  className="size-8"
                  square
                  size="sm"
                  alt=""
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                    {headerItems.userData["Name"]}
                  </span>
                  <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                    {headerItems.userData["LastLogin"]}
                  </span>
                </span>
              </span>
            </NavbarItem>
            <label className="px-4 py-2 inline-flex items-center cursor-pointer w-[100px]">
              <input
                type="checkbox"
                checked={isDark}
                onChange={() => setIsDark(!isDark)}
                className="sr-only peer"
              />
              {/* <div className="flex items-center justify-center w-full h-8 bg-gray-300  peer dark:bg-gray-700 peer-checked:after:translate-x-[100px] 
              after:content-[''] after:absolute after:top-1.5 after:left-[4px] after:bg-white after:border after:h-5 after:w-5 after:transition-all relative"> */}

              <div className="relative flex w-full h-8 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors items-center justify-center duration-300">
                <div
                  className={`absolute top-0.5 left-0.5 h-7 w-7 bg-white border transition-all duration-300 flex items-center justify-center rounded-full ${
                    isDark ? "translate-x-[35px]" : "translate-x-0"
                  }`}
                >
                  {isDark ? (
                    <Moon className="h-4 w-4 text-gray-700" />
                  ) : (
                    <Sun className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </div>
            </label>
          </NavbarSection>
          <NavbarSection className="w-full flex items-center justify-end lg:hidden">
            <div className="">
              <Dropdown icon={AlignRight}>
                <DropdownItem onClick={(e) => {}}>
                  <BellRing className="w-5 h-5 flex-shrink-0" />
                  <DropdownLabel>{"Notifications"}</DropdownLabel>
                </DropdownItem>
                <DropdownItem onClick={(e) => {}}>
                  <User className="w-5 h-5 flex-shrink-0" />
                  <DropdownLabel>{"Profile"}</DropdownLabel>
                </DropdownItem>
                {/* <DropdownItem className="flex w-full px-4 py-2 text-left text-sm hover:bg-gray-100 gap-4" onClick={(e) => {}}> */}
                {/* <SunMoon className="w-5 h-5 flex-shrink-0" /> */}
                <label className="w-full px-4 py-2 inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDark}
                    onChange={() => setIsDark(!isDark)}
                    className="sr-only peer"
                  />
                  {/* <div className="flex items-center justify-center w-full h-8 bg-gray-300  peer dark:bg-gray-700 peer-checked:after:translate-x-[100px] 
              after:content-[''] after:absolute after:top-1.5 after:left-[4px] after:bg-white after:border after:h-5 after:w-5 after:transition-all relative"> */}

                  <div className="relative flex w-full h-8 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors items-center justify-center duration-300">
                    <div
                      className={`absolute top-0.5 left-0.5 h-7 w-7 bg-white border transition-all duration-300 flex items-center justify-center rounded-full ${
                        isDark ? "translate-x-[100px]" : "translate-x-0"
                      }`}
                    >
                      {isDark ? (
                        <Moon className="h-4 w-4 text-gray-700" />
                      ) : (
                        <Sun className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <span className="text-s font-medium text-gray-900 dark:text-gray-100">
                      {!isDark ? "Dark-->" : "<--Light"}
                    </span>
                  </div>
                </label>
                {/* </DropdownItem> */}
              </Dropdown>
            </div>
          </NavbarSection>
        </>
      )}
    </Navbar>
  );
}
export default Header;
