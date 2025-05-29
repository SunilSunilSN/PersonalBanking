import React, { useEffect, useState } from "react";
import WidgetsPage from "./WidgetsPage";
import {Table} from "shared-services";
const DashboardPage = () => {
  const [renderDash, setRenderDash] = useState(null);
  window.setShowSideBar(true);
  useEffect(() => {
    const DashboardCall = async (req) => {
      const data = await window.ServerCall("dashboardAPI", "");
      if (data.success) {
        setRenderDash(true);
      } else {
        window.showAlert({
          AlertType: "E",
          AlertDesc: data.message,
          Btns: [
            {
              Name: "Ok",
              function: () =>
                window.launchMicroApp("login", "LoginPage", "BaseScreenID"),
            },
          ],
        });
        setRenderDash(false);
      }
    };
    //DashboardCall();
    setRenderDash(true);
  }, []);
  if (renderDash === null) {
    return <div>Loading...</div>;
  }

  return (
    <div id="DashboElmId" >
      <WidgetsPage />
      
    </div>
  );
};
export default DashboardPage;
