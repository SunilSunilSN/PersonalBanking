const express = require("express");
const router = express.Router();
const { getRecentTransaction } = require("../Controllers/TransactionController");
router.post("/getRecentTransaction", getRecentTransaction);
module.exports = router;
