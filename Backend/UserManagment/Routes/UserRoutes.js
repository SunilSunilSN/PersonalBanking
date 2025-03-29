const express = require("express");
const router = express.Router();
const { createUser, getAllUser, userLogin, getDashboard, userLogout } = require("../Controllers/UserControllers");

router.post("/createUser", createUser);
router.get("/getAllUser", getAllUser);
router.post("/userLogin", userLogin);
router.get("/getDashboard", getDashboard);
router.get("/logout", userLogout);
module.exports = router;
