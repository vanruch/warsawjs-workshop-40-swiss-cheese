const fs = require('fs').promises;

const uploadedFileNames = async (query = '') => {
  try {
    const fileNames = await fs.readdir('uploads');
    return fileNames.filter(
      fn => fn.toLowerCase().includes(query.toLowerCase()))
  } catch (e) {
    return [];
  }
};

const getFile = async (path) => {
  return fs.readFile(`uploads/${path}`);
};

module.exports.uploadedFileNames = uploadedFileNames;
module.exports.getFile = getFile;
