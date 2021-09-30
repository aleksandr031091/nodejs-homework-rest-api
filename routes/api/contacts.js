const express = require("express");
const router = express.Router();
const {
  controllerWraper,
  validation,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../model/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", authenticate, controllerWraper(ctrl.getAllContacts));

router.get("/:id", authenticate, controllerWraper(ctrl.getContactById));

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  controllerWraper(ctrl.addContact)
);

router.put(
  "/:id",
  authenticate,
  validation(joiSchema),
  controllerWraper(ctrl.upgateContactById)
);

router.delete("/:id", authenticate, controllerWraper(ctrl.removeContactById));

router.patch("/:id", authenticate, controllerWraper(ctrl.upgateFavoritById));

module.exports = router;
