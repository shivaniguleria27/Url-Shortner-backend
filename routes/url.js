const express = require("express");
const router = express.Router();

const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");
router.post("/", handleGenerateNewShortURL);
module.exports = router;
router.get("/analytics/:shortId", handleGetAnalytics);
