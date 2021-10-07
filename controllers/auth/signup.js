const { User } = require("../../model");
const { sendSuccessReq } = require("../../helpers");
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
  newUser.createDefaultAvatar(gravatar.url(newUser.email, { s: "200" }));

  await newUser.save();

  sendSuccessReq({
    res,
    code: 201,
    data: { message: "Created" },
  });
};

module.exports = signup;
