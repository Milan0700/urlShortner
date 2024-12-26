const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
const User = require("../model/user");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name: name,
    email: email,
    password: password,
  });
  return res.render("login");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  // const sessionId = uuidv4(); //statefull
  // setUser(sessionId, user); //statefull
  const token = setUser(user);

  res.cookie("token", token); //cookies set
  if (user.role.includes("ADMIN")) return res.redirect("/admin/urls"); //cookies set
  return res.redirect("/");
  // return res.json({ token });
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
