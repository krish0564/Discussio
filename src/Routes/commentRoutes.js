const express = require("express");
const router = express.Router({ mergeParams: true });
const protectRoutes = require("../util/protectedRoutes");
const commentController = require("../Controllers/commentController");

router.post("/", protectRoutes, commentController.postComment);
router
  .route("/:commentId")
  .put(protectRoutes, commentController.updateComment)
  .delete(protectRoutes, commentController.deleteComment);
router.post("/:commentId/like", protectRoutes, commentController.likeComment);
router.post("/:commentId/reply", protectRoutes, commentController.postReply);
module.exports = router;
