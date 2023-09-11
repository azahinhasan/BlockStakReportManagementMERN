const mongoose = require("mongoose");


const ReportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name "],
  },
  address:  {
    type: String
  },
  phone:  {
    type: String
  },
  email:  {
    type: String
  },
  profession:  {
    type: String
  },
  favorite_colors:  {
    type: [String]
  }
});

module.exports = mongoose.model("report", ReportSchema);
