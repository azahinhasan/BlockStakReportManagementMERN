const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config");



/**
 * @namespace AuthController
 **/


/**
 * SignIn
 * @memberof AuthController
 * @async
 * @method
 * @description Authentication verification. If user is verified then this function will set a token into the cookies.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/doctor.model
 * @returns {JSON} - returns message and success status.
 */
const signIn = async (req, res) => {
  try {
      let user = await User.findOne({ email: req.body.email });
   
      if (!user) return res.status(404).json({  success: false,message: "User not found" });
     
      if (!user.authenticate(req.body.password)) {
          return res.status(401).send({  success: false,message: "Email and password don't match. " });
      }
      const token = jwt.sign({ _id: user._id },config.JWT_SECRET,{ expiresIn:"1h"});
      res.cookie("token", token, { expires: new Date(Date.now()+60*60*1000)}); //expiring cookie in 1h
      req.session.token = token //setup session

      return res.status(200).json({ success: true, message: "Authentication success", token});
  } catch (err) {
      console.log(err);
      return res.status(403).json({ success: false, message: "Authentication failed" });
  }
};


/**
 * SignOut
 * @memberof AuthController
 * @async
 * @method
 * @description Will remove token from cookie.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/doctor.model
 * @returns {JSON} - returns message and success status.
 */
const signOut = (req, res) => {
  res.clearCookie("token");
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
  });
  return res.status(200).json({ success: true, message: "signed out" });
};




module.exports = { signIn,signOut };