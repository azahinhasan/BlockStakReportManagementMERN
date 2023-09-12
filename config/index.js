require("dotenv").config();

const config = {
  PORT: process.env.PORT || 5003,
  JWT_SECRET: process.env.JWT_SECRET||'tkf2efDPQEqKKmq',
  MONGO_URI: process.env.MONGO_URI||"mongodb+srv://TestProject:lJwMgRmpH6Ca00BX@cluster0.xf3qs.mongodb.net/blockstak_report_management_mern",
};

module.exports = config;
