var imageService = require('../services/image.service');

function getImage(req, res) {
  var collection = req.params.collection;
  var filename = req.params.filename;

  imageService.getImage(collection, filename).then((image) => {
    res.sendFile(image);
  });
}

module.exports = {
  getImage
};
