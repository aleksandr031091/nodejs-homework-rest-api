const express = require("express");
const router = express.Router();
const { controllerWraper, authenticate, upload } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWraper(ctrl.updateAvatar)
);

module.exports = router;
