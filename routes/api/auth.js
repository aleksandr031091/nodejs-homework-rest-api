const express = require("express");
const router = express.Router();
const {
  controllerWraper,
  validation,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../model/user");
const { auth: ctrl } = require("../../controllers");

router.post("/signup", validation(joiSchema), controllerWraper(ctrl.signup));

router.post("/login", validation(joiSchema), controllerWraper(ctrl.login));

router.get("/logout", authenticate, controllerWraper(ctrl.logout));

module.exports = router;
