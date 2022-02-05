const route = require('express').Router();
const rescue = require('express-rescue');
const validatePostSchema = require('../schemas/postSchema.js');
const postService = require('../services/postService');
const categoryService = require('../services/categoryService');
const auth = require('./middlewares/auth');

const err = new Error('"categoryIds" not found');
err.code = 'categoryNotFound';

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

    const result = await postService.create({ userId: req.user.id, title, content, categoryIds,
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
