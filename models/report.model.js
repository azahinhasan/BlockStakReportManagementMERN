const mongoose = require("mongoose");


const ReportSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  profession: String,
  favorite_colors: [String],
});

module.exports = mongoose.model("report", ReportSchema);
