const { User } = require("../../model");
const { sendSuccessReq } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    sendSuccessReq({
      res,
      code: 401,
      status: "Unauthorized",
      message: "Email or password is wrong",
    });
    return;
  }

  const token = user.createToken();

  res.json({
    code: 200,
    status: "success",
    data: { token },
  });
};

module.exports = login;
