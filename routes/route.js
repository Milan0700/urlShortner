const express = require("express");
const { handleGenShortUrl, getAnalytics } = require("../controller/url");
const router = express.Router();

router.post("/", handleGenShortUrl);

router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
