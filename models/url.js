const mongoose = require("mongoose");

const UrlSchema = mongoose.Schema({
  original: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Url", UrlSchema);