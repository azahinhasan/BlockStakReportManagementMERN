const User = require("../models/user.model");

/**
 * @namespace UserController
 **/

/**
 * @memberof UserController
 * @async
 * @method
 * @description Create a new user.With this information they can login to the system.
 * @param {object} req - request object.
 * @param {object} res - response object.
 * @requires ../models/user.model
 * @returns {JSON} - if success returns the object(contains details of newly created user) as data else error.
 */
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    user.save();
    res.status(201).json({ success: true, message: "User created", data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}



module.exports = {createUser};