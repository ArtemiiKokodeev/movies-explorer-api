const router = require('express').Router();
const {
  getCurrentUser, updateUserInfo,
} = require('../controllers/users');
const {
  updateUserInfoJoiValidation,
} = require('../middlewares/userJoiValidation');

router.get('/me', getCurrentUser);
router.patch('/me', updateUserInfoJoiValidation, updateUserInfo);

module.exports = router;
