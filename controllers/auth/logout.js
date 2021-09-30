const { User } = require("../../model");
const { sendSuccessReq } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  sendSuccessReq({ res, code: 204 });
};

module.exports = logout;
