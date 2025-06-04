const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AccountSchema = new Schema({
  CIF: { type: String, required: true },
  AccountNumber: { type: String, required: true },
  AccountCode: { type: String, required: true },
  HomeBranch: { type: String, required: true },
  FullName: { type: String, required: true },
  NickName: { type: String, required: true },
  Status: { type: String, required: true },
  Group: { type: String, required: true },
  AvailableBalance: { type: String, required: true },
  CreatedDate: { type: String, required: true },
  HomeBranchCode: { type: String, required: true },
  TransactionRights: { type: String, required: true },
});
const AccountsData = mongoose.model("Accounts", AccountSchema, "Accounts");
module.exports = AccountsData;
