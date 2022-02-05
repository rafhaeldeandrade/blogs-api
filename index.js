const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');
const joiErrorController = require('./controllers/middlewares/joiErrorController');
const domainErrorController = require('./controllers/middlewares/domainErrorController');
const errorController = require('./controllers/middlewares/errorController');

const app = express();
app.use(bodyParser.json());
app.use('/user', userController);
app.use('/login', loginController);
app.use('/categories', categoryController);
app.use('/post', postController);
app.use(joiErrorController);
app.use(domainErrorController);
app.use(errorController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
