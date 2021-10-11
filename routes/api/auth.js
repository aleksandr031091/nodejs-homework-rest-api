const express = require("express");
const router = express.Router();
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../model");
const { auth: ctrl } = require("../../controllers");

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));

router.get("/logout", authenticate, controllerWrapper(ctrl.logout));

module.exports = router;
