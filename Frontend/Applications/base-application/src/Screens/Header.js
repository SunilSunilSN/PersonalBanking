import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from 'shared-services';
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
  useEffect(() => {
    fetchHeaderData(); // ✅ call inside useEffect
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
            onClick={() =>
              window.launchMicroApp(
                item.Navigate.MicroApp,
                item.Navigate.Screen,
                "LoginId"
              )
            }
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
