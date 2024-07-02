const User = require("../models/UserModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json({
        status: "success",
        users,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserByName = async (req, res, next) => {
  try {
    const user = await User.find({ name: req.body.name });
    if (!user) {
      throw new Error("No User with this name found");
    }
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) throw new Error("No User  found");
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new Error("No User Found");
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// follow another User
exports.followUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (!req.user.following.includes(user._id)) {
      req.user.following.push(user._id);
      console.log(req.user);
      await req.user.save({ validateBeforeSave: false });
    }
    if (!user.followers.includes(req.user._id)) {
      user.followers.push(req.user._id);
      console.log(user);
      await user.save({ validateBeforeSave: false });
    }
    res.status(200).json({ data: req.user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
