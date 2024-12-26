const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

function restricTo(roles = []) {
  console.log(roles);
  return function (req, res, next) {
    console.log(req.user);
    console.log(roles);

    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("unauthorized");
    return next();
  };
}

// async function restrictToLoginUserOnly(req, res, next) {
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers["Authorization"];
//   // console.log(req.headers, "header");

//   if (!userUid) return res.render("login");
//   const token = userUid.split("Bearer ")[1];
//   const user = getUser(token);
//   console.log(user, "user");

//   // const user = getUser(userUid);

//   if (!user) return res.render("login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   // const userUid = req.cookies?.uid;
//   // console.log(req.headers, "header");

//   const userUid = req.headers["authorization"];
//   // console.log(req.header, "header");

//   const token = userUid.split("Bearer ")[1];
//   console.log(token);

//   const user = getUser(token);
//   console.log(user, "user");

//   // const user = getUser(userUid);

//   req.user = user;
//   next();
// }

module.exports = { checkForAuthentication, restricTo };
