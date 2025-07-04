import React, { useEffect, useCallback } from "react";
import OTPModal from "./OTPModal";
function OTPAuthPage(params) {
   window.setLoader(false);
  const fetchSecuParam = useCallback(async () => {
    console.log(params)
    try {
      const secParam = await window.getCommonData(["SecurityParameters"]);
      const securityParam = secParam[0].Value;
      if (securityParam) {
        window.setModalData({
          isOpen: true,
          ModalTitle: "Please Enter OTP",
          ModalChildren: <OTPModal Request={params} SecurityParams={securityParam}  />,
          closeBtn: false,
          Btns: [],
        });
      }
    } catch (err) {
      window.showAlert({
        AlertType: "E",
        AlertDesc: "Failed to load security parameters",
        Btns: [
          {
            Name: "Retry",
            function: fetchSecuParam,
          },
          {
            Name: "Cancel",
            function: () =>
              window.launchMicroApp("login", "LoginPage", "BaseScreenID"),
          },
        ],
      });
    }
  }, [params]) ;
  useEffect(() => {
    fetchSecuParam();
  }, [fetchSecuParam]);
  return null;
}

export default OTPAuthPage;
