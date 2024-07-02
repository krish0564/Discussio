const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: String,
  likes: { type: Number, default: 0 },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
