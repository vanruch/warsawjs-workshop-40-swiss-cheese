const html = require('./html');

module.exports = (searchedPattern, files) => html(`
  <h1>My files</h1>
  <form method="post" enctype="multipart/form-data">
    <div class="form-group">
      <div class="custom-file">
        <input type="file" class="custom-file-input" id="uploadFile" name="file">
        <label class="custom-file-label" for="uploadFile">Choose file to upload...</label>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Upload</button>
  </form>
  <form method="get">
    <div class="form-group">
      <label for="searchbox">Find file</label>
      <input name="find" class="form-control" placeholder="Search" id="searchBox">
    </div>
    <button type="submit" class="btn btn-primary">Find</button>
  </form>
  ${searchedPattern ? `
    <p>You searched for: ${searchedPattern}</p>
  ` : ''}
  <ul>
    ${files.map(file => `<li>
      <a href="/files/${file}">${file}</a>
    </li>`).join('')}
  </ul>
`);

