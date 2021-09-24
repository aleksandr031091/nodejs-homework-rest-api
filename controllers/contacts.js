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

const addContact = async (req, res) => {};

const upgateContactById = async (req, res) => {};
const removeContactById = async (req, res) => {};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  upgateContactById,
  removeContactById,
};
