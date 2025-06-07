const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const otpSchema = new Schema({
  UserName: { type: String, required: true },
  otp: { type: String, required: true },
  WorkFlowId: { type: String, required: true },
  Step: { type: String, required: true },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 5 * 60 * 1000), // 5 min
  },
});
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
otpSchema.index({ UserName: 1, WorkFlowId: 1, Step: 1 }, { unique: true });
module.exports = mongoose.model("OTP", otpSchema, "OTPs");