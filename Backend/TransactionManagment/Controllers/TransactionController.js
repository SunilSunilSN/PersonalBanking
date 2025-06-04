const TransactionModel = require("../Models/TransactionModel");
require("../../SharedServices/Environments/loadEnvironment")();
const getRecentTransaction = async (req, res) => {
  try {
    const { CIF, AccountNumber } = req.body;
    const RecentTran = await TransactionModel.find({CIF, AccountNumber});
    if (RecentTran.length == 0) {
      return res.error(`No Recent Transaction Found With Account Number ${AccountNumber} `, 400);
    }
    return res.success("Recent Transaction List fetched Succesfully", RecentTran, 201);
  } catch (error) {
    return res.error("Error in Recent Transaction Fetch", 500);
  }
};
module.exports = { getRecentTransaction };