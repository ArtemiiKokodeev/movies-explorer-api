const { celebrate, Joi } = require('celebrate');

// проверка полей при создании юзера
module.exports.createUserJoiValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

// проверка полей при авторизации
module.exports.loginJoiValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// проверка полей при обновлении профиля
module.exports.updateUserInfoJoiValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});
