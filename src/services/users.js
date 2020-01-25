module.exports = class UsersService {
  constructor(knex) {
    this.knex = knex
  }

  async register (userName, password) {
    await this.knex('users').insert({
      name: userName,
      password
    })
  }

  async auth (userName, password) {
    return this.knex('users').where({
      name: userName,
      password
    }).first();
  }
};
