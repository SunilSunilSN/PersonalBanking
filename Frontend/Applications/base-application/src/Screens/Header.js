import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
    SidebarItem,
    SidebarLabel
} from "shared-services";
import { InboxIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
function Header() {
  const [headerItems, setHeaderItems] = useState([]);
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
      if (headers) setHeaderItems(headers);
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
    window.setHeaderItems = setHeaderItems; // ✅ call inside useEffect
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
        {headerItems.map((item, index) => (
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
      <NavbarSection>
        <NavbarItem href="/search" aria-label="Search">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </NavbarItem>
        <NavbarItem href="/inbox" aria-label="Inbox">
          <InboxIcon className="w-5 h-5" />
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  );
}
export default Header;
