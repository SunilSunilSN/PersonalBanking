import React from "react";
import LoginPage from "../LoginPage";
import RegistrationPage from "../RegistrationPage";

const MicroAppMapper = ({ location }) => {
  const searchParams = new URLSearchParams(location?.search);
  const screen = searchParams.get("screen");

  const props = Object.fromEntries(searchParams.entries()); // { screen: "LoginPage", userId: "123" }

  switch (screen) {
    case "LoginPage":
      return <LoginPage {...props} />;
    case "RegistrationPage":
      return <RegistrationPage {...props} />;
    default:
      return <div>Screen not found</div>;
  }
};

export default MicroAppMapper;