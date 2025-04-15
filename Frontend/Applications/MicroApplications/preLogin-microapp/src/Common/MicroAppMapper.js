import React from "react";
import PreLoginPage from "../PreLoginPage";

const MicroAppMapper = ({ location }) => {
  const searchParams = new URLSearchParams(location?.search);
  const screen = searchParams.get("screen");

  const props = Object.fromEntries(searchParams.entries()); // { screen: "LoginPage", userId: "123" }

  switch (screen) {
    case "PreLoginPage":
      return <PreLoginPage {...props} />;
    default:
      return <div>Screen not found</div>;
  }
};

export default MicroAppMapper;