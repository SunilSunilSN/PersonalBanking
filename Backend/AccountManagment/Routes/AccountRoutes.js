const express = require("express");
const router = express.Router();
const { getAllAccounts } = require("../Controllers/AccountController");
router.post("/getAllAccounts", getAllAccounts);
module.exports = router;
