const route = require('express').Router();
const rescue = require('express-rescue');
const validatePostSchema = require('../schemas/postSchema.js');
const postService = require('../services/postService');
const categoryService = require('../services/categoryService');
const auth = require('./middlewares/auth');

const err = new Error('"categoryIds" not found');
err.code = 'categoryNotFound';

route.get(
  '/',
  rescue(auth),
  rescue(async (_req, res) => {
    const result = await postService.findAll();

    return res.status(200).json(result);
  }),
);

route.get(
  '/:id',
  rescue(auth),
  rescue(async (req, res) => {
    const { id } = req.params;
    const result = await postService.findById({ id });

    if (!result) {
      const error = new Error('Post does not exist');
      error.code = 'notFound';
      throw error;
    }

    return res.status(200).json(result);
  }),
);

route.post(
  '/',
  rescue(auth),
  rescue(async (req, res) => {
    validatePostSchema(req.body);
    const { title, content, categoryIds } = req.body;
    await Promise.all(
      categoryIds.map(async (c) => {
        const result = await categoryService.findById({ id: c });

        if (!result) {
          throw err;
        }
      }),
    );

    const result = await postService.create({
      userId: req.user.id,
      title,
      content,
      categoryIds,
    });

    return res.status(201).json({
      id: result.id,
      userId: result.userId,
      title: result.title,
      content: result.content,
    });
  }),
);

module.exports = route;
