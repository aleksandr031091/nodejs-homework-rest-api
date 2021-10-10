const { User } = require("../../model");
const { sendSuccessReq } = require("../../helpers");
const { NotFound } = require("http-errors");

const verify = async (req, res) => {
  const { verifyToken } = req.params;
  const user = await User.findOne({ verifyToken });

  if (!user) {
    throw new NotFound(`User not found`);
  }

  console.log(user._id);
  await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });

  sendSuccessReq({
    res,
    data: { message: "Verification successful" },
  });
};

module.exports = verify;
