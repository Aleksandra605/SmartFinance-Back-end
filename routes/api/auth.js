const express = require('express');
const { userSchemaJoi, balanceSchemaJoi } = require('../../model/user');
const {
  register,
  login,
  logout,
  currentUser,
  updateAvatar,
  verify,
  repeatVerification,
  updateBalance,
  getBalance,
} = require('../../controllers/index');
const { validation, authenticate, upload } = require('../../middlewares/index');

const router = express.Router();

router.post('/signup', validation(userSchemaJoi), register);

router.post('/login', validation(userSchemaJoi), login);

router.get('/logout', authenticate, logout);

router.get('/current', authenticate, currentUser);

router.get('/balance', authenticate, getBalance);

router.put(
  '/:userId',
  authenticate,
  validation(balanceSchemaJoi),
  updateBalance
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatarURL'),
  updateAvatar
);

router.get('/verify/:verificationToken', verify);

router.post('/verify', repeatVerification);

module.exports = router;
