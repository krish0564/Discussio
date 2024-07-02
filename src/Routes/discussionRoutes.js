const express = require("express");
const router = express.Router();

const discussionController = require("../Controllers/discussionController");
const protectRoutes = require("../util/protectedRoutes");
const commentRoutes = require("./commentRoutes");

router.use("/:postId/comments", commentRoutes);
router
  .route("/")
  .get(protectRoutes, discussionController.getAllDisscussion)
  .post(protectRoutes, discussionController.createdisscussion);
router
  .route("/:id")
  .post(protectRoutes, discussionController.getPostById)
  .patch(protectRoutes, discussionController.updateDiscussion)
  .delete(protectRoutes, discussionController.deleteDiscussion);
router.post(
  "/:id/likes",
  protectRoutes,
  discussionController.postLikeDiscussion
);
router.get(
  "/search",
  protectRoutes,
  discussionController.getDiscussionByHastag
);
router.get(
  "/searchText",
  protectRoutes,
  discussionController.getDiscussionByTextfeed
);

module.exports = router;
