const express = require('express');
const path = require('path');
const page = require('../../views/files');
const {uploadedFileNames} = require('../../services/uploadedFiles');
const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query.find;
  const files = await uploadedFileNames(query);
  res.send(page(req.query.find, files));
});
router.post('/', ((req, res) => {
  const {file} = req.files;
  file.mv(`./uploads/${file.name}`);
  res.redirect('/files')
}));
router.use('/:path', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../uploads', req.params.path));
});

module.exports = router;
