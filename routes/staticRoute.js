const express = require("express");
const router = express.Router();
const URL = require("../model/url");
const { restricTo } = require("../middleware/auth");

router.get("/admin/urls", restricTo(["ADMIN"]), async (req, res) => {
  const allUrl = await URL.find({});
  return res.render("home", { urls: allUrl });
});

router.get("/", restricTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allUrl = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls: allUrl });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
