const express = require('express');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const cors = require('cors');
const { requestLogger } = require('./middlewares/request.log');
const { errorLogger } = require('./middlewares/error.log');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { dbAdress } = require('./config');

const { PORT = 3001 } = process.env;
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'https:.....', // домен указать когда сделаю домен по фронтенду
  credentials: true, // для того, чтобы CORS поддерживал кроссдоменные куки
}));
app.use(express.json());
app.use(requestLogger); // подключаем логгер запросов

app.use(routes);

mongoose.connect(dbAdress, {
  useNewUrlParser: true,
});
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);// централизованный обработчик
app.listen(PORT, () => { });
