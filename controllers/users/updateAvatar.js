const path = require("path");
const fs = require("fs/promises");

const { User } = require("../../model");
const { sendSuccessReq } = require("../../helpers");
const { NotFound } = require("http-errors");

const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public/avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempStorage, originalname } = req.file;
    const { _id } = req.user;

    await Jimp.read(tempStorage)
      .then((image) => image.cover(250, 250).write(tempStorage))
      .catch(console.log);

    const [avatarExtension] = originalname.split(".").reverse();
    const fileName = path.join(`user_avatar-image_${_id}.${avatarExtension}`);
    const uploadDir = path.join(avatarsDir, fileName);

    await fs.rename(tempStorage, uploadDir);

    const user = await User.findByIdAndUpdate(
      _id,
      { avatarURL: `/avatars/` + fileName },
      { new: true }
    );

    sendSuccessReq({
      res,
      code: 200,
      status: "success",
      data: { avatarUrl: user.avatarURL },
    });
  } catch (error) {
    await fs.unlink(tempStorage);
    throw new NotFound(`Contact with id=${_id} not found`);
  }
};

module.exports = updateAvatar;
