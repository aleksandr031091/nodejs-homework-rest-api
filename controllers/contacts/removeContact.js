const { Contact } = require("../../model");
const { sendSuccessReq } = require("../../helpers");
const { NotFound } = require("http-errors");

const removeContactById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndDelete(id);

  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }

  sendSuccessReq({ res, data: { result } });
};

module.exports = removeContactById;
