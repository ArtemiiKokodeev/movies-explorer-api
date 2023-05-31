const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const options = require('./utils/cors-options');
const limiter = require('./middlewares/ratelimiter');
const { createUserJoiValidation, loginJoiValidation } = require('./middlewares/userJoiValidation');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorhandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const DataNotFoundError = require('./errors/DataNotFoundError');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const { PORT, DB_ADDRESS } = require('./utils/config');

mongoose.set('strictQuery', false);
mongoose.connect(DB_ADDRESS);

const app = express();

app.use('*', cors(options));
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);

app.post('/signup', createUserJoiValidation, createUser);
app.post('/signin', loginJoiValidation, login);
app.use('/users', auth, usersRouter);
app.use('/movies', auth, moviesRouter);

app.use((req, res, next) => next(new DataNotFoundError('Данной страницы не существует')));

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // console.log(`App listening on port ${PORT}`);
});
