module.exports = `
<div>
  <form method="post" action="/users/register">
    <div class="form-group">
      <label for="username">Username</label>
      <input class="form-control" id="username" name="username"/>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" name="password">
    </div>
    <button type="submit" class="btn btn-secondary">Register</button>
  </form>
</div>
`;
