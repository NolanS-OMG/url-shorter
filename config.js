require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8000,
  db_uri: process.env.DB_URI
};