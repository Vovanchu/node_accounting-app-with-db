'use strict';

const { Category } = require('./../models/Category.model');

const getAllCategory = () => {
  return Category.findAll();
};

const getCategoryById = (id) => {
  return Category.findByPk(id);
};

const createCategory = (name) => {
  return Category.create({ name });
};

const deleteCategory = (id) => {
  return Category.destroy({ where: { id } });
};

const updateCategory = (id, data) => {
  return Category.update(data, { where: { id } });
};

module.exports = {
  getAllCategory,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
};
