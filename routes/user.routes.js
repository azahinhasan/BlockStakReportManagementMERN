const userCtrl = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.route("/").post(userCtrl.createUser);

module.exports = router;
