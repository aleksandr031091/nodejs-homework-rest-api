const express = require("express");
const router = express.Router();
const { controllerWraper, validation } = require("../../middlewares");
const { joiSchema } = require("../../model/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", controllerWraper(ctrl.getAllContacts));

router.get("/:id", controllerWraper(ctrl.getContactById));

router.post("/", validation(joiSchema), controllerWraper(ctrl.addContact));

router.put(
  "/:id",
  validation(joiSchema),
  controllerWraper(ctrl.upgateContactById)
);

router.delete("/:id", controllerWraper(ctrl.removeContactById));

// router.patch("/:id", controllerWraper(ctrl));

module.exports = router;
