const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
//const expressJwt = require("express-jwt");
const config = require("../config");

/**
 * @namespace AuthController
 **/

const signIn = async (req, res) => {
  try {
     // console.log(req.body);
      let user = await User.findOne({ email: req.body.email });
   
      if (!user) return res.status(404).json({ error: "User not found" });
     
      if (!user.authenticate(req.body.password)) {
          return res.status(401).send({ error: "Email and password don't match. " });
      }
      const token = jwt.sign({ _id: user._id },config.JWT_SECRET,{ expiresIn:"1h"});
      res.cookie("token", token, { expires: new Date(Date.now()+60*60*1000)});

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
  return res.status(200).json({ success: true, message: "signed out" });
};




module.exports = { signIn,signOut };