const html = require('./html');
const register = require('./auth/register');
const login = require('./auth/login');
const logout = require('./auth/logout');

module.exports = (user, tasks) => html(`
  <h1>TODO list</h1>
  ${!user ? `
    <p>
      <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#registerCollapse" aria-expanded="false" aria-controls="registerCollapse">
        Register
      </button>
      <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#loginCollapse" aria-expanded="false" aria-controls="loginCollapse">
        Log in
      </button>
    </p>
  ` : `<p>
    Hello, ${user.name} ${logout}
    </p>`}
  <div class="collapse" id="registerCollapse">
    ${register}
  </div>
  <div class="collapse" id="loginCollapse">
    ${login}
  </div>
  ${user ? `
    <form method="post">
      <div class="form-group">
        <label for="name">Add a task</label>
        <input name="name" class="form-control" placeholder="Name" id="name"/>
        <textarea name="description" class="form-control" placeholder="Details"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Add</button>
    </form>
  ` : ''}
  <div class="tasks">
    ${tasks.map(task => `
      <div class="card" style="width: 18rem;">
        ${task.finished ? `<h5 class="card-header">Finished</h5>` : ''}
        <div class="card-body">
          <h5 class="card-title">${task.name}</h5>
          <p class="card-text">${task.description}</p>
          ${!task.finished ? `
            <form action="todo/${task.id}/finish" method="post">
              <button type="submit" class="btn btn-secondary">Finish</button>
            </form>      
          ` : ''}
          </div>
      </div>
    `).join('\n')}
  </div>
`, {
  isAdmin: user && user['is_admin'],
});

