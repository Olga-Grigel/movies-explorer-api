require('dotenv').config();

const { NODE_ENV, JWT_SECRET, DB_ADRESS } = process.env;
const secretKey = NODE_ENV !== 'production' ? 'some-secret-key' : JWT_SECRET;
const dbAdress = NODE_ENV !== 'production' ? 'mongodb://localhost:27017/bitfilmsdb' : DB_ADRESS;

module.exports = {
  secretKey,
  dbAdress,
};
