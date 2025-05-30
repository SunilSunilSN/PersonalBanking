import React from "react";
import LoginPage from "../Screens/LoginPage";
import RegistrationPage from "../Screens/RegistrationPage";
import DashboardPage from "../Screens/DashboardPage";
import ProfilePage from "../Screens/ProfilePage";

const MicroAppMapper = ({ location }) => {
  const searchParams = new URLSearchParams(location?.search);
  const screen = searchParams.get("screen");

  const props = Object.fromEntries(searchParams.entries()); // { screen: "LoginPage", userId: "123" }

  switch (screen) {
    case "LoginPage":
      return <LoginPage {...props} />;
    case "RegistrationPage":
      return <RegistrationPage {...props} />;
    case "DashboardPage":
      return <DashboardPage {...props} />;
          case "ProfilePage":
      return <ProfilePage {...props} />;
    default:
      return <div>Screen not found</div>;
  }
};

export default MicroAppMapper;