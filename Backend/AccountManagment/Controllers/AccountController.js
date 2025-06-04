const AccountModel = require("../Models/AccountModel");
require("../../SharedServices/Environments/loadEnvironment")();
const getAllAccounts = async (req, res) => {
  try {
    const { CIF } = req.body;
    const accounts = await AccountModel.find({CIF});
    if (accounts.length == 0) {
      return res.error(`No Accounts Found With CIF ${CIF}`, 400);
    }
    return res.success("Accounts List fetched Succesfully", accounts, 201);
  } catch (error) {
    return res.error("Error in Accounts List Fetch", 500);
  }
};
module.exports = { getAllAccounts };