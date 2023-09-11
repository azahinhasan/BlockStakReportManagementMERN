const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name "],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, "Email already exists"],
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
    required: [true, "Please enter email address"],
  },
  hashed_password: {
    type: String,
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  profession: {
    type: String,
  },
  favorite_colors: [String],
  is_admin: {
    type: Boolean,
    default: false,
  },
  salt: {
    type: String, //will help us to encrypt password. it's user specific.
  }
});

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password; //getting password from request.
    this.salt = this.makeSalt(); //creating user specific salt.
    this.hashed_password = this.encryptPassword(password); //encrypting password and storing into hashed_password
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText) {
    //verify the user's provided password during login by comparing it with the hashed password stored in the database.
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "Password is required";
    try {
      //if there is password during user registration then it will be encrypted and return
      return crypto
        .createHmac("sha256", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return err;
    }
  },
  makeSalt: function () {
    //creating salt.
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

UserSchema.path("hashed_password").validate(function (v) {
  //password validation
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

module.exports = mongoose.model("user", UserSchema);