const { Contact } = require("../../model");
const { sendSuccessReq } = require("../../helpers");
const { NotFound } = require("http-errors");

const upgateFavoritById = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  sendSuccessReq(res, { result });
};

module.exports = upgateFavoritById;
