import React, { useEffect, useState, useRef } from "react";
import OTPModal from "./OTPModal";
function OTPAuthPage(AuthDetails) {
  const fetchSecuParam = async () => {
    const secParam = await window.getCommonData(["SecurityParameters"]);
    const securityParam = secParam[0].Value;
    if(securityParam){
    window.setModalData({
      isOpen: true,
      ModalTitle: "Please Enter OTP",
      ModalChildren: <OTPModal SecurityParams={securityParam}/>,
      closeBtn: false,
      Btns: [
        // {
        //   Name: "Yes",
        //   function: () => {
        //     console.log("Yes clicked");
        //   },
        // },
        // {
        //   Name: "Cancel",
        //   function: () =>
        //     window.setModalData((prev) => ({ ...prev, isOpen: false })),
        // },
      ],
    });
    }

  };
  useEffect(() => {
    fetchSecuParam();

    
  }, []);
  return null;
}

export default OTPAuthPage;
