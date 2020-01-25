const authenticate = (usersService) => async (req, res, next) => {
  if (req.query.username && req.query.password) {
    req.user = await usersService.auth(req.query.username, req.query.password);
  } else if (req.cookies.username && req.cookies.password) {
    req.user = await usersService.auth(
      req.cookies.username,
      req.cookies.password);
  }
  if (req.user) {
    res.cookie('username', req.user.name);
    res.cookie('password', req.user.password);
  }
  next();
};

module.exports = authenticate;
