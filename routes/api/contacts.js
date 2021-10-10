const express = require("express");
const router = express.Router();
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../model/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", authenticate, controllerWrapper(ctrl.getAllContacts));

router.get("/:id", authenticate, controllerWrapper(ctrl.getContactById));

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.addContact)
);

router.put(
  "/:id",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.upgateContactById)
);

router.delete("/:id", authenticate, controllerWrapper(ctrl.removeContactById));

router.patch("/:id", authenticate, controllerWrapper(ctrl.upgateFavoritById));

module.exports = router;
