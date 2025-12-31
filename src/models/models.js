'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');

User.hasMany(Expense, {
  foreignKey: 'user_id',
  as: 'expenses',
});

Expense.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'users',
});

module.exports = {
  models: {
    User,
    Expense,
  },
};
