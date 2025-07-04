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
} from "shared-services";
import {
  InboxIcon,
  BellAlertIcon,
} from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
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
        <div>
          {PItems.map((item, index) => {
            //const IconComponent = IconsMap[item.Icon];
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
                {/* <IconComponent className="w-5 h-5" /> */}
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
      return window.showPopover(target, HeaderPopup(item.PopItems), "bottom");
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
      {/* <Dropdown>
        <DropdownButton as={NavbarItem}>
          <Avatar src="/tailwind-logo.svg" />
          <ChevronDownIcon />
        </DropdownButton>
        <DropdownMenu className="min-w-64" anchor="bottom start">
          <DropdownItem href="/teams/1/settings">
            <Cog8ToothIcon className='w-5 h-5'/>
            <DropdownLabel>Settings</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem href="/teams/1">
            <Avatar slot="icon" src="/tailwind-logo.svg" />
            <DropdownLabel>Tailwind Labs</DropdownLabel>
          </DropdownItem>
          <DropdownItem href="/teams/2">
            <Avatar slot="icon" initials="WC" className="bg-purple-500 text-white" />
            <DropdownLabel>Workcation</DropdownLabel>
          </DropdownItem>
          <DropdownDivider />
          <DropdownItem href="/teams/create">
            <PlusIcon />
            <DropdownLabel>New team&hellip;</DropdownLabel>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown> */}
      <NavbarDivider className="max-lg:hidden" />
      <NavbarSection className="max-lg:hidden">
        {headerItems.List.map((item, index) => (
          <NavbarItem
            key={index}
            id="HeaderId"
            // className="text-gray-600 hover:text-black cursor-pointer"
            onClick={(e) => {
              Clickfunc(e, item, index);
            }}
          >
            {item.Name}
          </NavbarItem>
        ))}
      </NavbarSection>
      <NavbarSpacer />
      {headerItems.IsLoggedIn && (
        <NavbarSection>
          <NavbarItem href="/search" aria-label="Search">
            <BellAlertIcon className="w-5 h-5" />
          </NavbarItem>
          <NavbarItem href="/inbox" aria-label="Inbox">
            <InboxIcon className="w-5 h-5" />
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
                className="size-10"
                square
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
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDark}
              onChange={() => setIsDark(!isDark)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all relative">
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100">
              Dark Mode
            </span>

            </div>

          </label>
        </NavbarSection>
      )}
    </Navbar>
  );
}
export default Header;
