const express = require("express");
const router = express.Router();
const Joi = require("joi");
const contactsOperations = require("../../model/index.js");

const contactSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  phone: Joi.required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const id = JSON.parse(contactId);
    const contact = await contactsOperations.getContactById(id);

    if (!contact) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      status: "success",
      code: 200,
      data: { result: contact },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const err = new Error(`message: ${error.message}`);
      err.status = 400;
      throw err;
    }

    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const err = new Error(`message: ${error.message}`);
      err.status = 400;
      throw err;
    }

    const { contactId } = req.params;
    const id = JSON.parse(contactId);
    const result = await contactsOperations.updateContact(id, req.boby);
    if (!result) {
      const error = new Error(`Product with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const id = JSON.parse(contactId);
    const result = await contactsOperations.removeContact(id);

    if (!result) {
      const error = new Error(`Contact with id=${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.json({
      status: "success",
      code: 200,
      message: result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
