import React from "react";
import AccountsPage from "../Screens/AccountsPage";
import AccountDetails from "../Screens/AccountsDetails";

const MicroAppMapper = ({ location }) => {
  const searchParams = new URLSearchParams(location?.search);
  const screen = searchParams.get("screen");

  const props = Object.fromEntries(searchParams.entries()); // { screen: "LoginPage", userId: "123" }

  switch (screen) {
    case "AccountsPage":
      return <AccountsPage {...props} />;
    case "AccountDetails":
      return <AccountDetails {...props} />;
    default:
      return <div>Screen not found</div>;
  }
};

export default MicroAppMapper;
