const express = require('express');
const route = express.Router();
const controllerCategory = require('../controller/category.controller.js');

route.get('/', controllerCategory.getAllCategorys);
route.get('/:id', controllerCategory.getCategoryById);
route.post('/', controllerCategory.createCategory);
route.delete('/:id', controllerCategory.deleteCategory);
route.patch('/:id', controllerCategory.updateCategory);

module.exports = route;
