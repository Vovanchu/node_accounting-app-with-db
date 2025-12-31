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
    const {
      spentAt,
      title,
      amount,
      category = 'Other',
      userId,
      note,
    } = req.body;

    if (!spentAt || !title || amount === undefined || !category || !userId) {
      return res
        .status(400)
        .send(
          'Missing required fields: spentAt, title, amount, category, userId',
        );
    }

    const userExists = await serviceUser.getUserById(userId);

    if (!userExists) {
      return res.status(400).send('User not found');
    }

    const newExpense = await serviceExpense.createExpense({
      spentAt,
      title,
      amount,
      category,
      userId,
      note,
    });

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
    const expenseData = {
      ...req.body,
      userId: req.user?.id ?? req.body.userId,
    };

    if (!id) {
      return res.status(400).send('Expense ID is required');
    }

    if (!(await serviceExpense.getExpenseById(+id))) {
      return res.status(404).send('Expense not found');
    }

    const allowedFields = [
      'spentAt',
      'title',
      'amount',
      'category',
      'note',
      'userId',
    ];

    const dataToUpdate = {};

    for (const key of allowedFields) {
      if (expenseData[key] !== undefined) {
        dataToUpdate[key] = expenseData[key];
      }
    }

    await serviceExpense.updateExpense(+id, dataToUpdate);

    const updatedExpense = await serviceExpense.getExpenseById(+id);

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
