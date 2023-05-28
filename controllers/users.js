const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = require('../config');
const User = require('../models/user');
const DataNotFoundError = require('../errors/DataNotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { OK, CREATED } = require('../utils/constants');

// POST /signup — создаёт пользователя (регистрация)
module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.status(CREATED).send({
      _id: user._id,
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};

// POST /signin — авторизация пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(() => {
      throw new UnauthorizedError('Неправильная почта и/или пароль');
    })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      throw new UnauthorizedError('Неправильная почта и/или пароль');
    }))
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ user, token });
    })
    .catch(next);
};

// GET /users/me - возвращает текущего пользователя
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new DataNotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch(next);
};

// PATCH /users/me — обновляет профиль
module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new DataNotFoundError('Запрашиваемый пользователь не найден');
    })
    .then((user) => res.status(OK).send({ data: user }))
    .catch(next);
};
