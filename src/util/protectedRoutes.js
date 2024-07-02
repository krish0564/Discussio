const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const protectRoutes = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    //console.log(token);
    if (!token) {
      throw new Error("UnAutharize acces");
    }
    const decoded = jwt.verify(token, "Secret_Key_1234");
    if (!decoded) {
      throw new Error("UnAutharize acces");
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error("No user Found");
    }
    req.user = user;
    //console.log(user);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = protectRoutes;
