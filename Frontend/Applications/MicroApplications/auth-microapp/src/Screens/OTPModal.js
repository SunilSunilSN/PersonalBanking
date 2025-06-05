import React, { useEffect, useState, useRef } from "react";

function OTPModal({Request, onSuccess, onCancel, onFailure, onRegenOTP, SecurityParams}) {
  const OTPLength = SecurityParams[0].OTPLength;
  const [otp, setOtp] = useState(Array(OTPLength).fill(""));
  const inputsRef = useRef([]);

  useEffect(() => {
    setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 100);
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTPLength - 1) {
      setTimeout(() => {
        inputsRef.current[index + 1]?.focus();
        
      }, 0);
    }
    if(newOtp[OTPLength - 1] !== "" && index == OTPLength - 1){
        handleSubmit(newOtp);
    }
  };

  const handleSubmit = (newOtp) => {
    console.log(newOtp);
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setTimeout(() => {
        inputsRef.current[index - 1]?.focus();
        if(inputsRef.current[index].value == ""){
            inputsRef.current[index - 1].value = "";
            otp[index - 1] = "";
        }
      }, 0);
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
            className="w-10 h-12 text-center border rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>
    </div>
  );
}

export default OTPModal;
