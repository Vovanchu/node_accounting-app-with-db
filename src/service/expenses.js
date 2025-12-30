'use strict';

const { Expense } = require('../models/Expense.model.js');
const { Op } = require('sequelize');

const getAllExpenses = () => {
  return Expense.findAll();
};

const getByQuery = (query) => {
  if (!query || Object.keys(query).length === 0) {
    return Expense.findAll();
  }

  const { userId, categories, from, to } = query;
  const whereClause = {};

  if (userId) {
    whereClause.user_id = userId; // Виправлено з userId на user_id
  }

  if (categories) {
    const categoryList = Array.isArray(categories)
      ? categories
      : categories.split(',');

    whereClause.category = { [Op.in]: categoryList };
  }

  if (from && to) {
    whereClause.spent_at = { [Op.between]: [from, to] };
  }

  return Expense.findAll({ where: whereClause });
};

const getExpenseById = (id) => {
  return Expense.findByPk(id);
};

const createExpense = (expenseData) => {
  return Expense.create(expenseData);
};

const deleteExpense = (id) => {
  return Expense.destroy({ where: { id } });
};

const updateExpense = (id, expenseData) => {
  return Expense.update(expenseData, { where: { id } });
};

module.exports = {
  getAllExpenses,
  getByQuery,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
