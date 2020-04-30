var uploadService = require('../services/upload-photo.service');

function uploadPhoto(req, res) {
  var collection = req.params.collection;
  var id = req.params.id;
  var file = req.files;

  if (!req.files) {
    return res.status(400).json({
      status: 'error',
      message: 'No se ha seleccionado ninguna imagen'
    });
  }

  var typeCollections = ['users', 'hospitals', 'doctors'];
  if (typeCollections.indexOf(collection) < 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Tipo de colleccion no permitido',
      errors: { message: 'Tipos permitidos: ' + typeCollections.join(', ') }
    });
  }

  var validFile = ['jpg', 'png', 'gif', 'jpeg'];
  var filename = file.photo.name;
  filename = filename.split('.');
  var extFile = filename[filename.length - 1];

  if (validFile.indexOf(extFile) < 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Tipo de imagen no permitido',
      errors: { message: 'Tipos permitidos: ' + validFile.join(', ') }
    });
  }

  switch (collection) {
    case 'users':
      uploadService
        .updatePhotoUser(id, file.photo, extFile)
        .then((updateUser) => {
          res.status(200).json({
            status: 'ok',
            user: updateUser
          });
        });
      break;
  }
}

module.exports = {
  uploadPhoto
};
