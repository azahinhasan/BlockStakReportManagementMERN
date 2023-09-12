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
    
    try{
      if (err) {
        //token verification failed or expired
        if(req.session.token){ //checking session is running or not
    
          const userId=jwt.decode(req.cookies.token)?._id

          if(userId){ //will process only if userId is valid string.
            const token = jwt.sign({ _id:userId },config.JWT_SECRET,{ expiresIn:config.TOKEN_EXPIRE}); //creating new token
            res.cookie("token", token, { expires: new Date(Date.now()+60*60*1000)}); //expiring cookie in 1h
            req.session.token = token; //resetting session
            res.locals.userId = userId; //passing user id to next() function. In our case it's checkAuthorization()
          }
          else{
            //if there is no userID in decoded token object
            return res.status(401).json({ success: false, message: "Invalid token" });
          }

        }
        else{
          return res.status(401).json({ success: false, message: "Invalid token or session" });
        }
      }
      else{
        res.locals.userId = decodedToken._id; //passing user id to next() function. In our case it's checkAuthorization()
        if(!req.session.token){
          //if cookies have valid token but no session active information.
          req.session.token = req.cookies.token //reactivating session 
        }
      }
  
      next();
    }
    catch(error){
      console.log(error);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
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
  try{
    const user = await User.findById(res.locals.userId);
    if (!user.is_admin) {
      //if user is not admin
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized to access" });
    }
    next();
  }
  catch(error){
    console.log(error);
    res.status(400).json({ success: false, message: "Something Want Wrong or invalid userId!" });
  }
};

module.exports = { checkTokenValidity, checkAuthorization };
