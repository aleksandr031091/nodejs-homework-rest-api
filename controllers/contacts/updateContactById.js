const { Contact } = require("../../model");
const { sendSuccessReq } = require("../../helpers");
const { NotFound } = require("http-errors");

const upgateContactById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }

  sendSuccessReq({ res, data: { result } });
};

module.exports = upgateContactById;
