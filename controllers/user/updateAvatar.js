const fs = require('fs/promises');
const path = require('path');
const { next } = require('process');
const { User } = require('../../model/user');
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../public/avatars');

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const [extension] = originalname.split('.').reverse();
  const filename = `${_id}.${extension}`;
  const resultUpload = path.join(avatarsDir, filename);
  try {
    const file = await Jimp.read(tempUpload);
    file.resize(250, 250).write(tempUpload);

    await fs.rename(tempUpload, resultUpload);
    const image = path.join('avatars', filename);
    const result = await User.findByIdAndUpdate(
      _id,
      { avatarURL: image },
      {
        new: true,
      }
    );

    if (!result) {
      throw new Error();
    }

    res.status(200).json({
      avatarURL: result?.avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(error);
  }
};

module.exports = updateAvatar;
