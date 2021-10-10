const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const { SECRET_KEY } = process.env;

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.setVerifyToken = function () {
  this.verifyToken = nanoid();
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.createToken = function () {
  const payload = {
    id: this._id,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

userSchema.methods.createDefaultAvatar = function (avatar) {
  this.avatarURL = avatar;
};

const joiSchema = Joi.object({
  password: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

const joiSchemaReVerify = Joi.object({
  email: Joi.string().email().required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSchema,
  joiSchemaReVerify,
};
