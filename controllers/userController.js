const route = require('express').Router();
const rescue = require('express-rescue');
const validateRegisterUser = require('../schemas/registerSchema');
const userService = require('../services/userService');
const generateJwt = require('../jwt');

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
