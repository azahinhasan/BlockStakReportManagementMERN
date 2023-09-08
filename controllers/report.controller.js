const Report = require("../models/report.model");
const config = require("../config");
const jwt = require("jsonwebtoken");

/**
 * @namespace ReportController
 **/

/**
 * @memberof ReportController
 * @async
 * @method
 * @description Get the list of all reports.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/report.model
 * @returns {JSON} -  if success returns the array of object(contains all reports) as data else error.
 */
const getReportList = async (req, res) => {
  try {
    const list = await Report.find({})
    res
      .status(200)
      .json({ success: true, message: "Data Found", data: list });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

/**
 * @memberof ReportController
 * @async
 * @method
 * @description Get reports details by ID.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/report.model
 * @returns {JSON} - if success returns the object(contains details of reports) as data else error.
 */
const getReportByID = async (req, res) => {
  try {
    const report = await Report.findById(req.params.reportId)

    if (!report) {
      return res.status(404).json({ success: false, message: "No match found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Data Found Successfully", data: report });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

/**
 * @memberof ReportController
 * @async
 * @method
 * @description Create a new report.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/report.model
 * @returns {JSON} -  if success returns new created report details as data else error.
 */
const createReport = async (req, res) => {
  try {
    const newData = await Report.create(req.body);
   // newData.save();
    res
      .status(200)
      .json({ success: true, message: "Created Successfully", data: newData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong!" });
  }
};

/**
 * @memberof ReportController
 * @async
 * @method
 * @description Delete a report by ID.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/report.model
 * @returns {JSON} - if success returns the object(contains details of deleted report) as data else error.
 */
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.reportId);
    if (!report) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Report deleted", data: report });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.reportId, req.body);
    if (!report) {
      return res.status(404).json({ success: false, message: "No data found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Report updated", data: report });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getReportList,
  createReport,
  getReportByID,
  deleteReport,
  updateReport,
};
