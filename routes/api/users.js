const express = require("express");
const router = express.Router();
const {
  controllerWraper,
  validation,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../model/user");
const { auth: ctrl } = require("../../controllers");

module.exports = router;
