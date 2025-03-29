const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  UserName: { type: String, required: true },
  Password: { type: String, required: true },
  UserRole: { type: String, required: true },
});
const UserData = mongoose.model("User", UserSchema, "Users");
module.exports = UserData;
