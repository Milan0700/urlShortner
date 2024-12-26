const shortid = require("shortid");
const URL = require("../model/url");

async function handleGenShortUrl(req, res) {
  const body = req.body;
  console.log(body, "body");
  console.log(body.url, "body url");
  console.log(URL, "URL");

  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = shortid();

  await URL.create({
    sortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", { id: shortId });
  // return res.json({ id: shortId });
}

async function getAnalytics(req, res) {
  const sortId = req.params.shortId;
  const result = await URL.findOne({ sortId });
  return res.json({
    totalclick: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGenShortUrl, getAnalytics };
