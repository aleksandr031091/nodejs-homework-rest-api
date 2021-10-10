const { User } = require("../../model");
const { sendSuccessReq } = require("../../helpers");
const { NotFound } = require("http-errors");
const { sendEmail } = require("../../helpers");

const reVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFound(`User with ${email} does not exist`);
  }

  const { verify, verifyToken } = user;
  const data = {
    to: email,
    subject: "Подтверджение email",
    html: `<a href="http://localhost:3000/api/v1/users/verify/${verifyToken}"target="_blank">Подтвердить регистрацию</a>`,
  };

  if (!verify) {
    await sendEmail(data);

    return sendSuccessReq({
      res,
      data: { message: "Verification email sent" },
    });
  }

  sendSuccessReq({
    res,
    code: 400,
    data: { message: "Verification has already been passed" },
  });
};

module.exports = reVerify;
