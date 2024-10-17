const express = require("express");
const app = express();

const urlRoute = require("./routes/url");
const { connecttomongoDB } = require("./connect");
const URL = require("./models/url");
const PORT = 8001;

connecttomongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  return res.redirect(entry.redirectUrl);
});

app.use(express.json());
app.use("/url", urlRoute);
app.listen(PORT, () => console.log(`server started:${PORT}`));
