const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  TextFeed: {
    type: String,
    max: 255,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Post must be given by a signed in user"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  hashtags: [String],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.ObjectId, ref: "Comment" }],
});
discussionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "comments",
    select: "-__v ",
  });

  next();
});
const Discussion = mongoose.model("Discussion", discussionSchema);
module.exports = Discussion;
