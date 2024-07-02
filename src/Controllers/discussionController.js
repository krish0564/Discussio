const Discussion = require("../models/DiscussionModel");

//get all discussion
exports.getAllDisscussion = async (req, res) => {
  try {
    const discussion = await Discussion.find();
    if (!discussion) {
      throw new Error("No Discussion post found");
    }
    res.status(200).json({
      status: "success",
      data: discussion,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Create a discussion post
exports.createdisscussion = async (req, res, next) => {
  try {
    if (!req.body.TextFeed && !req.body.image) {
      throw new Error("for posting a discussion image or text is required");
    }

    const discussion = await Discussion.create({
      user: req.user._id,
      TextFeed: req.body.TextFeed,
      image: req.body.image,
      hashtags: req.body.hashtags,
    });

    if (!discussion) {
      throw new Error("Something Went Wrong");
    }
    res.status(201).json({ status: "success", discussion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// update discussion
exports.updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!discussion) throw new Error("No discussion post  found");
    res.status(200).json({
      status: "success",
      data: discussion,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// delete discussion
exports.deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndDelete(req.params.id);
    if (!discussion) throw new Error("No  discussion post found");
    res.status(204).json({
      status: "success",
      data: discussion,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get One Post
exports.getPostById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) throw new Error("No  discussion post found");
    discussion.views += 1; // to increase the view count
    await discussion.save();
    res.status(200).json({
      status: "success",
      data: discussion,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//like the discussion
exports.postLikeDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) throw new Error("No  discussion post found");
    discussion.likes += 1;
    await discussion.save();
    res.status(200).json({
      status: "success",
      data: discussion,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getDiscussionByHastag = async (req, res) => {
  try {
    const discussion = await Discussion.find({ hashtags: req.body.hastag });
    if (!discussion) throw new Error("No  discussion post found");
    res.status(200).json({
      status: "success",
      data: discussion,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Search discussions by text
exports.getDiscussionByTextfeed = async (req, res) => {
  try {
    const discussion = await Discussion.find({
      TextFeed: new RegExp(req.body.TextFeed, "i"),
    });
    if (!discussion) throw new Error("No  discussion post found");
    res.status(200).json({
      status: "success",
      data: discussion,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
