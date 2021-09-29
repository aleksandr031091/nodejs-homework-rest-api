const express = require("express");
const router = express.Router();
const { controllerWraper, validation } = require("../../middlewares");
const { joiSchema } = require("../../model/user");
const { auth: ctrl } = require("../../controllers");

router.post("/signup", validation(joiSchema), controllerWraper(ctrl.signup));

// router.post("/login", validation(joiSchema), controllerWraper(ctrl.login));

// router.get("/logout", validation(joiSchema), controllerWraper(ctrl.logout));

module.exports = router;
