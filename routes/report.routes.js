const reportCtrl = require('../controllers/report.controller');
const authCheck = require('../middleware/auth_check');
const express = require('express');
const router = express.Router();

router.route('/')
    .get(authCheck.checkTokenExpiration,reportCtrl.getReportList)
    .post(authCheck.checkTokenExpiration,authCheck.checkAuthorization,reportCtrl.createReport)

router.route('/:reportId')
    .get(authCheck.checkTokenExpiration,authCheck.checkAuthorization,reportCtrl.getReportByID)
    .put(authCheck.checkTokenExpiration,authCheck.checkAuthorization,reportCtrl.updateReport)
    .delete(authCheck.checkTokenExpiration,authCheck.checkAuthorization,reportCtrl.deleteReport)

module.exports = router;