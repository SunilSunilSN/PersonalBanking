import React, { useEffect, useState, useRef } from "react";

function OTPModal({
  Request,
  onSuccess,
  onCancel,
  onFailure,
  onRegenOTP,
  SecurityParams,
}) {
  const OTPData = SecurityParams[0];
  const [otp, setOtp] = useState(Array(OTPData.OTPLength).fill(""));
  const [resendOTP, setResendOTP] = useState(false);
  const [regenCount, setRegenCount] = useState(0);
  const [seconds, setSeconds] = useState(OTPData.OTPTimer);
  const inputsRef = useRef([]);
  useEffect(() => {
    setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 100);
  }, []);
useEffect(() => {
  if (seconds <= 0) {
    setRegenCount((prev) => {
      const next = prev + 1;
      if (next >= OTPData.OTPRegencount) {
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
                window.setModalData((prev) => ({ ...prev, isOpen: false }))
              }
            },
          ],
        });
      } else {
        setResendOTP(true);
      }
      return next;
    });
    return;
  }
  const interval = setInterval(() => {
    setSeconds((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(interval);
}, [seconds, OTPData.OTPRegencount]);

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
      index == OTPData.OTPLength - 1
    ) {
      handleSubmit(newOtp);
    }
  };

  const handleSubmit = (newOtp) => {
    console.log(newOtp);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setTimeout(() => {
        inputsRef.current[index - 1]?.focus();
        if (inputsRef.current[index].value == "") {
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

  const ResendOTP = () => {
     if (regenCount >= OTPData.OTPRegencount) return;
    setSeconds(OTPData.OTPTimer);
    setResendOTP(false);
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
        <div className={`flex justify-center gap-1  text-center text-gray-500 font-medium hover:text-blue-600 ${seconds < 5 ? "animate-breathe-fast" : "animate-breathe"}`}>
          Time remaining: 
          <div className={`${seconds < 5 ? "text-red-500" : "text-blue-600"}`}>{formatTime(seconds)}</div>
        </div>
      )}
    </div>
  );
}

export default OTPModal;
