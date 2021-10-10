const express = require("express");
const router = express.Router();
const {
  controllerWrapper,
  authenticate,
  validation,
  upload,
} = require("../../middlewares");
const { joiSchemaReVerify } = require("../../model");
const { users: ctrl } = require("../../controllers");

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verifyToken", controllerWrapper(ctrl.verify));

router.post(
  "/verify",
  validation(joiSchemaReVerify),
  controllerWrapper(ctrl.reVerify)
);

module.exports = router;
