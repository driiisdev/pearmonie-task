const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME||process.env.PROD_DB_NAME,
  process.env.DB_USERNAME||process.env.PROD_DB_USERNAME,
  process.env.DB_PASSWORD||process.env.PROD_DB_PASSWORD,
  {
    host: process.env.DB_HOST||process.env.PROD_DB_HOST,
    dialect: 'postgres',
    logging: false,
    define: {
      underscored: false,
      freezeTableName: true,
    },
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

module.exports = { sequelize, connectDB };
