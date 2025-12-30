'use strict';

const serviceExpense = require('../service/expenses.js');
const serviceUser = require('../service/users.js');

const getAllExpenses = async (req, res) => {
  try {
    const query = req.query;

    if (query && Object.keys(query).length > 0) {
      const expense = await serviceExpense.getByQuery(query);

      return res.send(expense);
    }

    const expenses = await serviceExpense.getAllExpenses();

    res.send(expenses);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send('Expense ID is required');
    }

    const expense = await serviceExpense.getExpenseById(id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.status(200).send(expense);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createExpense = async (req, res) => {
  try {
    const expenseData = req.body;

    // Перевірка обов'язкових полів
    if (
      !expenseData.spent_at ||
      !expenseData.title ||
      expenseData.amount === undefined ||
      !expenseData.category ||
      !expenseData.user_id
    ) {
      return res
        .status(400)
        .send(
          'Missing required fields: spent_at, title, amount, category, user_id',
        );
    }

    // Перевірка чи існує користувач
    const userExists = await serviceUser.getUserById(expenseData.user_id);

    if (!userExists) {
      return res.status(404).send('User not found');
    }

    const newExpense = await serviceExpense.createExpense(expenseData);

    res.status(201).send(newExpense);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await serviceExpense.getExpenseById(+id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await serviceExpense.deleteExpense(+id);

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expenseData = req.body;

    if (!id) {
      return res.status(400).send('Expense ID is required');
    }

    const existingExpense = await serviceExpense.getExpenseById(id);

    if (!existingExpense) {
      return res.status(404).send('Expense not found');
    }

    await serviceExpense.updateExpense(id, expenseData);

    const updatedExpense = await serviceExpense.getExpenseById(id);

    res.status(200).send(updatedExpense);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
