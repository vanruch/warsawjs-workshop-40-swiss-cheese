const express = require('express');
const url = require('url');

const usersRoute = (usersService) => {
  const router = express.Router();

  /* GET users listing. */
  router.get('/', (req, res, next) => {
    res.send('respond with a resource');
  });

  router.post('/register', async (req, res) => {
    await usersService.register(req.body.username, req.body.password);
    res.status(201).redirect(url.parse(req.headers.referer).pathname);
  });

  router.post('/logout', async (req, res) => {
    res.cookie('username', '');
    res.cookie('pass', '');
    res.status(200).redirect(url.parse(req.headers.referer).pathname);
  });

  router.get('/auth', async (req, res) => {
    const user = await usersService.auth(
      req.query.username,
      req.query.password
    );
    if (!user) {
      res.status(401).send('Used does not exist or password is incorrect');
    }
    res.cookie('username', user.name);
    res.cookie('pass', user.password);
    res.status(200).send(user)
  });
  return router;
};

module.exports = usersRoute;
