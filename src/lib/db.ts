import { Sequelize } from 'sequelize';

// Initialize Sequelize
export const sequelize = new Sequelize(
  process.env.DB_NAME || 'channel009',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL queries
  }
);
