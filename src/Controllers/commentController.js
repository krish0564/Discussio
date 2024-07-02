const Comment = require("../models/commentModel");
const Discussion = require("../models/DiscussionModel");
//post comment
exports.postComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.postId);

    if (!discussion) {
      throw new Error("No Post Found");
    }
    const comment = await Comment.create({
      user: req.user._id,
      comment: req.body.comment,
    });
    if (!comment) {
      throw new Error("Something went wrong");
    }
    discussion.comments.push(comment._id);
    await discussion.save();
    res.status(201).json({
      status: "success",
      comment,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//update comment
exports.updateComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.postId);
    if (!discussion) {
      throw new Error("No Post Found");
    }

    const comment = await Comment.findById(req.params.commentId);
    if (!comment || comment.user.toString() !== req.user._id.toString()) {
      throw new Error("No comment Exist or not autharise to update comment ");
    }

    comment.comment = req.body.comment;
    await comment.save();
    res.status(201).json({
      status: "success",
      comment,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//delete comment

exports.deleteComment = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.postId);
    if (!discussion) {
      throw new Error("No Post Found");
    }
    const comment = await Comment.findById(req.params.commentId);
    if (!comment || comment.user.toString() !== req.user._id.toString()) {
      throw new Error("No comment Exist or not autharise to delete comment ");
    }
    await comment.deleteOne();
    await discussion.comments.remove(req.params.commentId);
    res.status(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//like a comment
exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      throw new Error("No comment Exist ");
    }
    comment.likes += 1;
    await comment.save();
    res.status(201).json({
      status: "success",
      comment,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// add reply to comment
exports.postReply = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      throw new Error("No comment Exist ");
    }
    const reply = new Comment({
      user: req.user._id,
      comment: req.body.comment,
    });
    comment.replies.push(reply);
    await comment.save();
    res.status(201).json({
      status: "success",
      comment,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
