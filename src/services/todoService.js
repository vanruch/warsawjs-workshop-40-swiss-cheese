module.exports = class TodoService {
  constructor(knex) {
    this.knex = knex
  }

  async getAllTasks (userId) {
    return this.knex('todolist').where({
      user_id: userId,
    }).orderBy('created_at', 'desc').select()
  }

  async add (userId, name, description) {
    await this.knex.raw(
      `insert into "todolist" ("user_id", "name", "description") values (${userId}, '${name}', '${description || ''}')`
    );
  }

  async markAsDone (taskId) {
    await this.knex('todolist').where({
      id: taskId
    }).update({ finished: true })
  }
};
