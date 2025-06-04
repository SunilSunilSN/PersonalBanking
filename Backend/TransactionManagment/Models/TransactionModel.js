const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TransactionScehma = new Schema(
  {
    CIF: { type: String, required: true },
    AccountNumber: { type: String, required: true },
    AccountCode: { type: String, required: true },
    FullName: { type: String, required: true },
    ToAccountNumber: { type: String, required: true },
    ToBankAccount: { type: String, required: true },
    ToBankIFSC: { type: String, required: true },
    TransactionAmount: { type: Number, required: true },
    TransactionType: {
      type: String,
      enum: ["CREDIT", "DEBIT", "TRANSFER", "WITHDRAWAL", "DEPOSIT"],
      required: true,
    },
    TransactionDate: { type: Date, required: true },
    TransactionID: { type: String, required: true },
    TransactionRefNo: { type: String, required: true },
    TransactionDesc: { type: String, required: true },
    TransactionCharges: { type: Number, required: true },
    TransactionStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      required: true,
    },
  },
  { timestamps: true }
);
const TransactionData = mongoose.model(
  "Transaction",
  TransactionScehma,
  "Transactions"
);
module.exports = TransactionData;
