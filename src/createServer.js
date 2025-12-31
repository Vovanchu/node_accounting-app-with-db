/* eslint-disable no-console */
'use strict';

const express = require('express');
const routerUsers = require('./router/users.router.js');
const routerExpenses = require('./router/expense.router.js');
const { sequelize } = require('./db');

function createServer() {
  const app = express();

  (async () => {
    try {
      await sequelize.authenticate();
      console.log('✅ Connected to PostgreSQL successfully');
      console.log('DB port:', sequelize.options.port);
    } catch (error) {
      console.error('❌ Unable to connect to the database:', error);
    }
  })();

  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.use('/users', routerUsers);

  app.use('/expenses', routerExpenses);

  return app;
}

module.exports = {
  createServer,
};
