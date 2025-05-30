import React, { useEffect, useState } from "react";
import WidgetsPage from "./WidgetsPage";
import {Table} from "shared-services";
const DashboardPage = () => {
  const [renderDash, setRenderDash] = useState(null);
  window.setShowSideBar(true);
    const fetchHeaderData = async () => {
    const data = await window.getCommonData([
      "Post-Login-Header",
    ]);
    const PreLoginHeader = data.find((item) => item.Key === "Post-Login-Header");
    if (PreLoginHeader && PreLoginHeader.Value) {
      const headers = PreLoginHeader.Value.filter(
        (visib) =>
          visib.Visible === window.getDeviceType() || visib.Visible === "Both"
      );
      if (headers) window.setHeaderItems(headers);
    }
  };
  useEffect(() => {
    fetchHeaderData();
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
