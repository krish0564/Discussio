const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const generateTokenandCookies = require("../util/generateToken");

//signup api
exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    if (!newUser) {
      throw new Error("Something went wrong");
    }
    generateTokenandCookies(newUser._id, res);
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login api
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide email and password ");
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Incorrect email or password");
    }
    generateTokenandCookies(user._id, res);
    res.status(200).json({ status: "Success", data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//logout
exports.logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
