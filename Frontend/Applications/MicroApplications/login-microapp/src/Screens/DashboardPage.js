import React, { useEffect, useState } from "react";
import WidgetsPage from "./WidgetsPage";
import AnnouncementPage from "./AnnouncementPage";
import GraphPage from "./GraphPage";
const DashboardPage = () => {
  const [renderDash, setRenderDash] = useState(null);
  window.setShowSideBar(true);
  const fetchHeaderData = async () => {
    const data = await window.getCommonData(["Post-Login-Header"]);
    const PreLoginHeader = data.find(
      (item) => item.Key === "Post-Login-Header"
    );
    if (PreLoginHeader && PreLoginHeader.Value) {
      const headers = PreLoginHeader.Value.filter(
        (visib) =>
          visib.Visible === window.getDeviceType() || visib.Visible === "Both"
      );
      const userDateils = JSON.parse(localStorage.getItem("userDetails")).data;
      if (headers)
        window.setHeaderItems({
          List: headers,
          IsLoggedIn: true,
          userData: {
            Name: userDateils.UserName,
            LastLogin: userDateils.UserRole,
            ProfilePic: userDateils.ProfilePic,
          },
        });
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
              function: () => window.location.reload(),
            },
          ],
        });
        setRenderDash(false);
      }
    };
    DashboardCall();
    //setRenderDash(true);
  }, []);

  if (renderDash === null) {
    return <div>Loading...</div>;
  }

  return (
    <div id="DashboElmId">
      <GraphPage></GraphPage>
      <WidgetsPage start={0} end={4} />
      <AnnouncementPage />
      <div className="flex justify-end gap-2">
        <button
          onClick={() =>window.launchMicroApp("auth", "OTPAuthPage", "AuthModalId")}
          className="px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
      <WidgetsPage start={4} end={8} />
    </div>
  );
};
export default DashboardPage;
