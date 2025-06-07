const express = require("express");
const router = express.Router();
const { createUser, getAllUser, userLogin, getDashboard, userLogout } = require("../Controllers/UserControllers");
const { getCommonData, getAPIConfigData } = require("../Controllers/CommonControllers");
const {resendOTP} = require("../Controllers/CustomControllers");
const { WorkFlowService } = require("../Controllers/WorkFlowService");

router.post("/createUser", createUser);
router.get("/getAllUser", getAllUser);
router.post("/userLogin", userLogin);
router.get("/getDashboard", getDashboard);
router.get("/logout", userLogout);
router.post("/getCommonData", getCommonData);
router.get("/getAPIConfig", getAPIConfigData);
router.post("/WorkFlowCall", WorkFlowService);
router.post("/resendOTP", resendOTP);
module.exports = router;
