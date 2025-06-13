const TransactionModel = require("../Models/TransactionModel");
require("../../SharedServices/Environments/loadEnvironment")();
const getRecentTransaction = async (req, res) => {
  try {
    const { CIF, AccountNumber, FromDate, ToDate, NoOfTran } = req.body;
    let RecentTran = [];
    if (FromDate && ToDate) {
      RecentTran = await TransactionModel.find({
        CIF,
        AccountNumber,
        TransactionDate: { $gte: new Date(FromDate), $lte: new Date(ToDate) },
      }).sort({ TransactionDate: -1 });
    } else if(NoOfTran) {
            RecentTran = await TransactionModel.find({
        CIF,
        AccountNumber
      }).sort({ TransactionDate: -1 })
      .limit(NoOfTran);
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
    if(NoOfTran) {
        RecentTran
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
