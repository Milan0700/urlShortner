// statefull

const jsonwebtoken = require("jsonwebtoken");

// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//   console.log(id, user);

//   return sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }
//-----end-----

// state less

const jwt = require("jsonwebtoken");
const secret = "Milan@123";
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log(error);
    return null;
  }
}
//-----end-----
module.exports = { setUser, getUser };
