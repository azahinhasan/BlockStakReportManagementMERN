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
   
      if (!user) return res.status(404).json({  success: false,message: "User not found" }); //no user found with email
     
      if (!user.authenticate(req.body.password)) {
          return res.status(401).send({  success: false,message: "Email and password don't match. " }); //wrong password
      }
      const token = jwt.sign({ _id: user._id },config.JWT_SECRET,{ expiresIn:config.TOKEN_EXPIRE}); //creating token with 1h expires
      res.cookie("token", token, { expires: new Date(Date.now()+60*60*1000)}); //pushing token into cookies which will expiring cookie in 1h
      req.session.token = token //saving token into session will help us to detect is session running or not.

      return res.status(200).json({ success: true, message: "Authentication success", token});
  } catch (error) {
      console.log(error);
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
  res.clearCookie("token"); //removing cookie
  req.session.destroy((error) => {
    if (error) {
      console.error('Error destroying session:', error); //removing session
    }
  });
  return res.status(200).json({ success: true, message: "signed out" });
};




module.exports = { signIn,signOut };