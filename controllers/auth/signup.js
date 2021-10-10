const { User } = require("../../model");
const { sendSuccessReq, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password } = req.body;

  const result = await User.findOne({ email });

  if (result) {
    sendSuccessReq({
      res,
      code: 409,
      status: "error",
      data: { message: "Email in use" },
    });
    return;
  }

  const newUser = new User({ email });

  newUser.setPassword(password);
  newUser.setVerifyToken();
  newUser.createDefaultAvatar(gravatar.url(newUser.email, { s: "200" }));

  const { verifyToken } = await newUser.save();

  const data = {
    to: email,
    subject: "Подтверджение email",
    html: `<a href="http://localhost:3000/api/v1/users/verify/${verifyToken}"target="_blank">Подтвердить регистрацию</a>`,
  };
  await sendEmail(data);

  sendSuccessReq({
    res,
    code: 201,
    data: { message: "Created", verifyToken },
  });
};

module.exports = signup;
