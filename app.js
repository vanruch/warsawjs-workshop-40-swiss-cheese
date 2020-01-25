const Knex = require('knex');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

const indexRouter = require('./src/routes');
const filesRouter = require('./src/routes/files');
const todoRouter = require('./src/routes/todo');
const usersRouter = require('./src/routes/users');

const authenticate = require('./src/middlewares/auth');

const UsersService = require('./src/services/users');
const TodoService = require('./src/services/todoService');

const app = express();

const knex = new Knex({
  client: 'pg',
  connection: 'postgres://postgres@localhost:5432/warsawjs_db',
});

app.use(fileUpload({
  createParentPath: true,
  uriDecodeFileNames: false,
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let usersService = new UsersService(knex);
app.use(authenticate(usersService));

app.use('/', indexRouter);
app.use('/files', filesRouter);
app.use('/todo', todoRouter(new TodoService(knex)));
app.use('/users', usersRouter(usersService));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
