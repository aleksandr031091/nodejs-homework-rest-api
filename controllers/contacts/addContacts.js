const { Contact } = require("../../model");
const { sendSuccessReq } = require("../../helpers");

const addContact = async (req, res) => {
  const newContact = { ...req.body, owner: req.body._id };
  const result = await Contact.create(newContact);

  sendSuccessReq(res, result, 201);
};

module.exports = addContact;
