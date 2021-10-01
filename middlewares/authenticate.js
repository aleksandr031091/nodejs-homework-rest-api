const { User } = require("../model");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(" ");

  const errorAuthorized = () => {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Not authorized",
    });
  };

  if (bearer !== "Bearer") {
    return errorAuthorized();
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user.token) {
      return errorAuthorized();
    }

    req.user = user;
    next();
  } catch (error) {
    return errorAuthorized();
  }
};

module.exports = authenticate;
