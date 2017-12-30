/**
 * Postgres agent configuration
 */
const Sequelize = require('sequelize');

const { POSTGRES_URL } = require('../constants/VARIABLES');
const dbConfig = {
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },

  logging: false,

  define: {
    timestamps: true,
    paranoid: true,
  },
};

const PostgresDB = () => {
  return new Sequelize(POSTGRES_URL, dbConfig);
}


module.exports = {
  PostgresDB,
  Sequelize,
};
