const route = require('express').Router();
const rescue = require('express-rescue');
const validateLoginUserSchema = require('../schemas/loginSchema');
const loginService = require('../services/loginService');

route.post(
  '/',
  rescue(async (req, res) => {
    validateLoginUserSchema(req.body);
    const { email, password } = req.body;

    const token = await loginService.login({ email, password });

    return res.status(200).json({ token });
  }),
);

module.exports = route;
