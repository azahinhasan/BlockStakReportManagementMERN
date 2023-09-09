const userCtrl = require("../controllers/user.controller");
const express = require("express");
const authCheck = require("../middleware/auth_check");
const router = express.Router();

router.route("/").post(authCheck.checkTokenValidity, userCtrl.createUser);

module.exports = router;
