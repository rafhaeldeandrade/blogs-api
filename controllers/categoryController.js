const route = require('express').Router();
const rescue = require('express-rescue');
const categoryService = require('../services/categoryService');
const validateCategorySchema = require('../schemas/categorySchema');
const auth = require('./middlewares/auth');

route.post(
  '/',
  rescue(auth),
  rescue(async (req, res) => {
    validateCategorySchema(req.body);
    const { name } = req.body;
    const result = await categoryService.create({ name });

    return res.status(201).json(result);
  }),
);

route.get(
  '/',
  rescue(auth),
  rescue(async (_req, res) => {
    const result = await categoryService.findAll();

    return res.status(200).json(result);
  }),
);

module.exports = route;
