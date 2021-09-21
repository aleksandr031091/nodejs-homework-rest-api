const { Contact } = require("../model");
const { sendSuccessReq } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "_id name email phone favorite");
  sendSuccessReq(res, result);
};

module.exports = { getAll };
