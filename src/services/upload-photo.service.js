var User = require('../models/user.schema');
var Hospital = require('../models/hospital.schema');
var Doctor = require('../models/doctor.schema');

var fs = require('fs');

function updatePhotoUser(id, file, ext) {
  return new Promise((resolve, reject) => {
    // Generate new filename
    var filename = `${id}-${new Date().getTime()}.${ext}`;

    // Move dile to path
    var path = `src/uploads/users/`;
    file.mv(path + filename, (error) => {
      if (error) {
        reject(error);
      }
    });

    User.findById(id, 'name email photo role', (error, user) => {
      if (error) reject(error);

      if (user.photo) {
        fs.unlink(path + user.photo, () => {});
      }

      user.photo = filename;
      user.save((error, user) => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
    });
  });
}

module.exports = {
  updatePhotoUser
};
