const { Contact } = require("../../model");
const { sendSuccessReq } = require("../../helpers");

const getAllContacts = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner: req.user._id },
    "_id name email phone favorite",
    {
      skip,
      limit: +limit,
    }
  ).populate("owner", "_id email");

  sendSuccessReq({ res, data: { result } });
};

module.exports = getAllContacts;
