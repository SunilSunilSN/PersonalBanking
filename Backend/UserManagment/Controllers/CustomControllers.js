const UserModel = require("../Models/UserModel");
const OTPModel = require("../Models/OTPModel");
const { getSecurityParams } = require("../Controllers/CommonControllers");
const verifUser = async (req, res) => {
  try {
    const { UserName } = req.body;
    const user = await UserModel.findOne({ UserName });
    if (!user) {
      return res.error(`User With UserName: ${UserName} Doesnt Exist!`, 400);
    }
    if (user) {
      return res.success("User Successfullt Verified", req.body, 200);
    }
  } catch (error) {
    return res.error("User Verification Failed!", 500);
  }
};
const generateOtp = async (req, res) => {
  const { UserName, WorkFlowId, Step } = req.body;
  const SecurityParams = await getSecurityParams();
  try {
    const otpExpTime = SecurityParams.OTPTimer * 1000;
    const expiresAt = new Date(Date.now() + otpExpTime);
    const otpLength = SecurityParams.OTPLength;
    const min = Math.pow(10, otpLength - 1);
    const max = Math.pow(10, otpLength) - 1;
    const otp = Math.floor(min + Math.random() * (max - min + 1)).toString();
    await OTPModel.deleteOne({ UserName, WorkFlowId, Step });
    await OTPModel.create({ UserName, otp, WorkFlowId, Step, expiresAt });
    req.body.otp = otp;
    //await updateWorkflowStep(username, Step, WorkFlowId);
    return res.success("OTP generated and sent", req.body, 200); // In prod: don't send back OTP
  } catch (err) {
    return res.error("Database error", 500, err.message);
  }
};

const resendOTP = async (req, res) => {
  const { UserName, WorkFlowId, Step } = req.body;
  const SecurityParams = await getSecurityParams();
  try {
    const otpExpTime = SecurityParams.OTPTimer * 1000;
    const newExpiresAt = new Date(Date.now() + otpExpTime);
    const otpLength = SecurityParams.OTPLength;
    const min = Math.pow(10, otpLength - 1);
    const max = Math.pow(10, otpLength) - 1;
    const newOTP = Math.floor(min + Math.random() * (max - min + 1)).toString();
    const existing = await OTPModel.findOne({
      UserName,
      WorkFlowId,
      Step: "GENERATEOTP",
    });
    if (!existing) {
      await OTPModel.create({ UserName, otp:newOTP, WorkFlowId, Step, expiresAt:newExpiresAt });
    } else {
      await OTPModel.findOneAndUpdate(
        {
          UserName,
          WorkFlowId,
          Step: "GENERATEOTP", // existing fields to match
        },
        {
          $set: {
            otp: newOTP, // new OTP to update
            expiresAt: newExpiresAt, // new expiration time
          },
        },
        { upsert: true, new: true }
      );
    }
    req.body.otp = newOTP;
    return res.success("OTP re-generated and sent", req.body, 200);
  } catch (err) {
    return res.error("Ops Someting Went Wrong", 500, err.message);
  }
};

const validateOtp = async (req, res) => {
  const { UserName, otp, NewOTP, WorkFlowId, Step } = req.body;
  try {
    if (otp !== NewOTP) return res.error("OTP Match Failed!", 500);
    const found = await OTPModel.findOne({
      UserName,
      otp,
      WorkFlowId,
      Step: "GENERATEOTP",
    });
    if (!found) return res.error("OTP has expired!", 404);
    if (new Date() > new Date(found.expiresAt)) {
      return res.error("OTP has expired!", 410);
     }
    await OTPModel.deleteOne({ UserName, WorkFlowId, Step:"GENERATEOTP" });
    return res.success("Validated generated and sent", req.body, 200);
    
  } catch (err) {
    return res.error("Database error", 500, err.message);
  }
};
module.exports = { verifUser, generateOtp, validateOtp, resendOTP };
