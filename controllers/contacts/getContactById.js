const { Contact } = require("../../model");
const { sendSuccessReq } = require("../../helpers");
const { NotFound } = require("http-errors");

const getContactById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findById(id, "_id name email phone favorite");

  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }

  sendSuccessReq({ res, data: { result } });
};

module.exports = getContactById;
