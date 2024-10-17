const shortid = require("shortid");
const url = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  const shortID = shortid.generate(); // generate a new ID here
  try {
    const newUrl = new url({
      shortId: shortID, // use shortID here
      redirectUrl: body.url,
      visitHistory: [],
    });

    await newUrl.save();

    return res.json({ id: shortID, newUrl });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
