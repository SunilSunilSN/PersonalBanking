const TransactionModel = require("../Models/TransactionModel");
require("../../SharedServices/Environments/loadEnvironment")();
const getRecentTransaction = async (req, res) => {
  try {
    const { CIF, AccountNumber, FromDate, ToDate } = req.body;
    let RecentTran = [];
    if (FromDate && ToDate) {
      RecentTran = await TransactionModel.find({
        CIF,
        AccountNumber,
        TransactionDate: { $gte: new Date(FromDate), $lte: new Date(ToDate) },
      });
    } else {
      RecentTran = await TransactionModel.find({
        CIF,
        AccountNumber
      });
    }

    if (RecentTran.length == 0) {
      return res.error(
        `No Recent Transaction Found With Account Number ${AccountNumber} `,
        400
      );
    }
    return res.success(
      "Recent Transaction List fetched Succesfully",
      {"RecentTransaction": RecentTran, "FromDate": FromDate, "ToDate": ToDate},
      201
    );
  } catch (error) {
    return res.error("Error in Recent Transaction Fetch", 500);
  }
};
module.exports = { getRecentTransaction };
