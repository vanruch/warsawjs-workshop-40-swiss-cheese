const express = require('express');

const page = require('../views/todolist');

module.exports = (todoService) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    const tasks = req.user
    ? await todoService.getAllTasks(req.user.id)
    : [];
    res.send(page(req.user, tasks));
  });

  router.post('/', async (req, res) => {
    await todoService.add(req.user.id, req.body.name, req.body.description);
    res.redirect('/todo')
  });

  router.post('/:taskId/finish', async (req, res) => {
    console.log(req.params.taskId)
    await todoService.markAsDone(req.params.taskId);
    res.redirect('/todo')
  });

  return router;
};
