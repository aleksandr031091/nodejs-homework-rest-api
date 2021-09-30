const { Contact } = require("../../model");
const { sendSuccessReq } = require("../../helpers");

const addContact = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id };
  const result = await Contact.create(newContact);

  sendSuccessReq({ res, data: { result } });
};

module.exports = addContact;
