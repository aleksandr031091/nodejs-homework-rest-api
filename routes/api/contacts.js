const express = require("express");
const router = express.Router();
const { controllerWraper, validation } = require("../../middlewares");
const { joiSchema } = require("../../model/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", controllerWraper(ctrl.getAll));

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const id = JSON.parse(contactId);
//     const contact = await contactsOperations.getContactById(id);

//     if (!contact) {
//       const error = new Error(`Contact with id=${contactId} not found`);
//       error.status = 404;
//       throw error;
//     }

//     res.json({
//       status: "success",
//       code: 200,
//       data: { result: contact },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     if (error) {
//       const err = new Error(`message: ${error.message}`);
//       err.status = 400;
//       throw err;
//     }

//     const result = await contactsOperations.addContact(req.body);
//     res.status(201).json({
//       status: "success",
//       code: 201,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = contactSchema.validate(req.body);
//     if (error) {
//       const err = new Error(`message: ${error.message}`);
//       err.status = 400;
//       throw err;
//     }
//     const { contactId } = req.params;
//     const id = JSON.parse(contactId);

//     const result = await contactsOperations.updateContact(id, req.body);
//     if (!result) {
//       const error = new Error(`Contact with id=${contactId} not found`);
//       error.status = 404;
//       throw error;
//     }

//     res.status(201).json({
//       status: "success",
//       code: 201,
//       data: {
//         result,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const id = JSON.parse(contactId);
//     const result = await contactsOperations.removeContact(id);

//     if (!result) {
//       const error = new Error(`Contact with id=${contactId} not found`);
//       error.status = 404;
//       throw error;
//     }

//     res.json({
//       status: "success",
//       code: 200,
//       message: "Contact is deleted",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
