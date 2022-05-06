require('dotenv').config();

const { NODE_ENV, JWT_SECRET, DB_ADRESS } = process.env;
const secretKey = NODE_ENV !== 'production' ? 'some-secret-key' : JWT_SECRET;
const dbAdress = NODE_ENV !== 'production' ? 'mongodb://localhost:27017/bitfilmsdb' : DB_ADRESS;
// Email должен содержать латинские буквы, символы, знак @,
// доменное имя почтового сервера, точка (.) и доменное имя 1-го уровня от 2 до 5 букв
const EmailPattern = /^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+[.])+[a-z]{2,5}$/;
// Пароль должен содержать не менее 6 символов,
// включая строчные и прописные латинские буквы, цифры  и символы
const PasswordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
module.exports = {
  secretKey,
  dbAdress,
  EmailPattern,
  PasswordPattern,
};
