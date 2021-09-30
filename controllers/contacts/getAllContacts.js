const { Contact } = require("../../model");
const { sendSuccessReq } = require("../../helpers");

const getAllContacts = async (_, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner: req.user._id }, "", {
    skip,
    limit: +limit,
  }).populate("owner", "_id email");

  // const result = await Contact.find({}, "_id name email phone favorite");
  sendSuccessReq({ res, data: { result } });
};

module.exports = getAllContacts;
