import React, { useEffect, useState, useRef } from "react";

function OTPModal({ Request, SecurityParams }) {
  const OTPData = SecurityParams[0];
  const [otp, setOtp] = useState(Array(OTPData.OTPLength).fill(""));
  const [resendOTP, setResendOTP] = useState(false);
  const [regenCount, setRegenCount] = useState(0);
  const [seconds, setSeconds] = useState(OTPData.OTPTimer);
  const [dummyOTP, setDummyOTP] = useState("");
  const { onSuccess, onCancel, onFailure } = window.AuthFunctions({
    action: "GET",
  });
  const inputsRef = useRef([]);
  useEffect(() => {
    setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 100);
  }, []);
  useEffect(() => {
    setDummyOTP(Request.otp); // Set once on mount
  }, [Request.otp]);
  useEffect(() => {
    if (seconds <= 0) {
      // setRegenCount((prev) => {
      //   const next = prev + 1;
      if (regenCount >= OTPData.OTPRegencount) {
        window.showAlert(false);
        window.showAlert({
          AlertType: "E",
          AlertDesc:
            "You have Exhausted all the attempts Left, Please re-login",
          Btns: [
            {
              Name: "Ok",
              function: () => {
                window.launchMicroApp("login", "LoginPage", "BaseScreenID");
                window.setModalData((prev) => ({ ...prev, isOpen: false }));
              },
            },
          ],
        });
      } else {
        setResendOTP(true);
      }
      //   return next;
      // });
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, regenCount, OTPData.OTPRegencount]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTPData.OTPLength - 1) {
      setTimeout(() => {
        inputsRef.current[index + 1]?.focus();
      }, 0);
    }
    if (
      newOtp[OTPData.OTPLength - 1] !== "" &&
      index === OTPData.OTPLength - 1
    ) {
      ValidateOTP(newOtp);
    }
  };

  const ValidateOTP = (newOtp) => {
    window.setLoader(true);
    const Req = { ...Request, NewOTP: newOtp.join(""), otp: newOtp.join("") };
    window.WorkFlowCall("OTPAUTHANDLOGIN", "VALIDATEOTP", Req, ValidateOTPCB);
    console.log(newOtp);
  };

  const CancelOTP = () => {
    window.showAlert({
      AlertType: "I",
      AlertDesc: "Are You Sure Want to Cancel!",
      Btns: [
        {
          Name: "Yes",
          function: () => {
            window.setModalData((prev) => ({ ...prev, isOpen: false }));
            onCancel();
          },
        },
      ],
    });
  };

  const ValidateOTPCB = (res) => {
    window.setLoader(false);
    if (res.success) {
      onSuccess(res);
    } else {
      onFailure(res);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setTimeout(() => {
        inputsRef.current[index - 1]?.focus();
        if (inputsRef.current[index].value === "") {
          inputsRef.current[index - 1].value = "";
          otp[index - 1] = "";
        }
      }, 0);
    }
  };
  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const ResendOTP = async () => {
    setRegenCount((prev) => {
      return prev + 1;
    });
    if (regenCount >= OTPData.OTPRegencount) return;
    //const Req = { ...Request, NewOTP: otp.join("") };
    const data = await window.ServerCall("resendOTPAPI", Request);
    if (data.success) {
      setDummyOTP(data.data.otp);
      setSeconds(OTPData.OTPTimer);
      setResendOTP(false);
      setOtp(Array(OTPData.OTPLength).fill(""));
      inputsRef.current[0]?.focus();
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
    }
  };

  return (
    <div className="p-6">
      {/* <h2 className="text-xl font-semibold mb-4 text-center">Enter OTP</h2> */}
      <div className="flex justify-center gap-7 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength="1"
            className="w-10 h-12 text-center border rounded-2xl text-lg focus:outline-none focus:ring-2 border border-gray-200 shadow-sm bg-white focus:ring-blue-500"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
      {resendOTP ? (
        <div
          className="text-center text-blue-600 font-medium cursor-pointer hover:text-gray-500"
          onClick={() => ResendOTP()}
        >
          Resend OTP
        </div>
      ) : (
        <div
          className={`flex justify-center gap-1  text-center text-gray-500 font-medium hover:text-blue-600 ${
            seconds < 5 ? "animate-breathe-fast" : "animate-breathe"
          }`}
        >
          Time remaining:
          <div className={`${seconds < 5 ? "text-red-500" : "text-blue-600"}`}>
            {formatTime(seconds)}
          </div>
        </div>
      )}
      {dummyOTP && (
        <div
          className={`flex justify-center gap-1 text-center text-gray-500 font-medium hover:text-blue-600`}
        >
          {dummyOTP}
        </div>
      )}
      <div
        className={`flex justify-center gap-1 text-center text-gray-500 font-medium hover:text-blue-600`}
        onClick={() => CancelOTP()}
      >
        Cancel
      </div>
    </div>
  );
}

export default OTPModal;
