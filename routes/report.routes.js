const reportCtrl = require("../controllers/report.controller");
const authCheck = require("../middleware/auth_check.middleware");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(
    authCheck.checkTokenValidity, //token validity check
    reportCtrl.getReportList
  )
  .post(
    authCheck.checkTokenValidity, //token validity check
    authCheck.checkAuthorization, //checking user is admin or not
    reportCtrl.createReport
  );

router
  .route("/:reportId")
  .get(
    authCheck.checkTokenValidity, //token validity check
    authCheck.checkAuthorization, //checking user is admin or not
    reportCtrl.getReportByID
  )
  .put(
    authCheck.checkTokenValidity, //token validity check
    authCheck.checkAuthorization, //checking user is admin or not
    reportCtrl.updateReport
  )
  .delete(
    authCheck.checkTokenValidity, //token validity check
    authCheck.checkAuthorization, //checking user is admin or not
    reportCtrl.deleteReport
  );

module.exports = router;
