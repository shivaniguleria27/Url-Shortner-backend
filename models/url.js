const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: "String",
      unique: true,
      required: true,
    },
    redirectUrl: {
      type: "String",
      unique: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamp: true }
);
const URL= mongoose.model('url',urlSchema);
mongoose.exports = URL;