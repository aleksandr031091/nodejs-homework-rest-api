const { Contact } = require("../model");
const { sendSuccessReq } = require("../helpers");
const { NotFound } = require("http-errors");

const getAllContacts = async (req, res) => {
  const result = await Contact.find({}, "_id name email phone favorite");
  sendSuccessReq(res, result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findById(id, "_id name email phone favorite");

  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }

  sendSuccessReq(res, result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);

  sendSuccessReq(res, result, 201);
};

const removeContactById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndDelete(id);

  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }

  sendSuccessReq(res, { result });
};

const upgateContactById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }

  sendSuccessReq(res, { result });
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  upgateContactById,
  removeContactById,
};
