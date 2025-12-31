'use strict';

const { User } = require('./User.model');
const { Expense } = require('./Expense.model');
const { Category } = require('./Category.model');

User.hasMany(Expense, {
  foreignKey: 'user_id',
  as: 'expenses',
});

Expense.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'users',
});

Category.hasMany(Expense, {
  foreignKey: 'category_id',
  as: 'expenses',
});

Expense.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'categories',
});

module.exports = {
  models: {
    User,
    Expense,
  },
};
