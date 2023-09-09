const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config");

/**
 * @namespace AuthCheckMiddleware
 */

/**
 * @memberof AuthCheckMiddleware
 * @async
 * @method
 * @description Checking token is valid or not.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @param {function} next - next function.
 * @requires ../models/user.model
 * @requires ../config/config
 * @returns {JSON} - if user token in valid then function will redirect to next function else unauthorized error.
 */
const checkTokenValidity = async (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(403).json({
      success: false,
      message: "No token found.",
    });
  }

  jwt.verify(req.cookies.token, config.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      //token verification failed
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    res.locals.userId = decodedToken._id; //passing user id to next() function. In our case it's checkAuthorization()
    next();
  });
};


/**
 * @memberof AuthCheckMiddleware
 * @async
 * @method
 * @description Checking user is admin or not.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @param {function} next - next function.
 * @requires ../models/user.model
 * @requires ../config/config
 * @returns {JSON} - if user is admin then function will redirect to next function else unauthorized error.
 */
const checkAuthorization = async (req, res, next) => {
  const user = await User.findById(res.locals.userId);
  if (!user.is_admin) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized to access" });
  }
  next();
};

module.exports = { checkTokenValidity, checkAuthorization };
