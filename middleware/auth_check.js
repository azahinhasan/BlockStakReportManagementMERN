const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config");



const checkTokenExpiration = async (req, res, next) => {
  next()
};

const checkAuthorization = async (req, res, next) => {
  next()
};


module.exports = { checkTokenExpiration, checkAuthorization };
