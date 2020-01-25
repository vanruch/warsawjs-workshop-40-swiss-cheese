const fs = require('fs').promises;

const uploadedFileNames = async (query = '') => {
  const fileNames = await fs.readdir('uploads');
  return fileNames.filter(fn => fn.toLowerCase().includes(query.toLowerCase()))
};

const getFile = async (path) => {
  return fs.readFile(`uploads/${path}`);
};

module.exports.uploadedFileNames = uploadedFileNames;
module.exports.getFile = getFile;
