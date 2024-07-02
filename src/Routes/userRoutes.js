const express = require("express");
const router = express.Router();

const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");
const protectRoutes = require("../util/protectedRoutes");

router
  .route("/")
  .get(protectRoutes, userController.getAllUsers)
  .post(protectRoutes, userController.getUserByName);

router
  .route("/:id")
  .patch(protectRoutes, userController.updateUser)
  .delete(protectRoutes, userController.deleteUser);
router.post("/:id/follow", protectRoutes, userController.followUser);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
module.exports = router;
