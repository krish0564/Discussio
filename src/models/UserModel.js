const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter the Name"],
  },
  email: {
    type: String,
    required: [true, "enter your email"],
    unique: true,
    validate: [validator.isEmail],
  },
  MobileNo: {
    type: String,
    required: [true, "enter your Mobile Number"],
    unique: true,
    validate: [validator.isNumeric],
  },
  password: {
    type: String,
    required: [true, "please  enter the password"],
    minlength: [8, "A password must have atlrast 8 characters"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password  Required"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password must be same",
    },
  },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "following",
    select: "-__v -email -MobileNo  -following -followers",
  });

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
