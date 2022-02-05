const route = require('express').Router();
const rescue = require('express-rescue');
const validateRegisterUser = require('../schemas/registerSchema');
const userService = require('../services/userService');
const generateJwt = require('../jwt');
const auth = require('./middlewares/auth');

route.get(
  '/',
  rescue(auth),
  rescue(async (_req, res) => {
    const result = await userService.findAll();

    return res.status(200).json(result);
  }),
);

route.post(
  '/',
  rescue(async (req, res) => {
    validateRegisterUser(req.body);

    const { displayName, email, password, image } = req.body;

    const created = await userService.findOrCreateUser({
      displayName,
      email,
      password,
      image,
    });

    if (!created) {
      return res.status(409).json({ message: 'User already registered' });
    }

    const token = generateJwt({ email });

    return res.status(201).json({ token });
  }),
);

module.exports = route;
