const express = require("express");
const app = express();
const PORT = 8001;
const path = require("path");
const URL = require("./model/url");
const { connectMongoDB } = require("./connection");
const cookieParser = require("cookie-parser");
const url = "mongodb://127.0.0.1:27017/urlshortner";
const { checkForAuthentication, restricTo } = require("./middleware/auth");
const urlRoute = require("./routes/route");
const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restricTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const sortId = req.params.shortId;
  console.log(sortId);

  const entry = await URL.findOneAndUpdate(
    {
      sortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectUrl);
});

connectMongoDB(url)
  .then(() => {
    console.log("connection is ready");
  })
  .catch((err) => {
    console.log(`there is error in connection : ${err}`);
  });

app.listen(PORT, () => {
  console.log("MILAN");
});
