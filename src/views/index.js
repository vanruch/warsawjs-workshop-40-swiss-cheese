const html = require('./html');

module.exports = html(`
  <form action="/xss/ref" method="get">
    <input name="name" placeholder="Enter your name">
    <input type="submit" value="Send"/>
  </form>
`);
