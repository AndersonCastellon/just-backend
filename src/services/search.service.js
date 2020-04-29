var User = require('../models/user.schema');
var Hospital = require('../models/hospital.schema');
var Doctor = require('../models/doctor.schema');

/**
 * Search all
 */
function searchAll(regex) {
  return Promise.all([
    searchUsers(regex),
    searchHospitals(regex),
    searchDoctors(regex)
  ]);
}

function searchUsers(regex) {
  return new Promise((resolve, reject) => {
    User.find({}, 'name email photo role')
      .or([{ name: regex }, { email: regex }])
      .exec((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
  });
}

function searchHospitals(regex) {
  return new Promise((resolve, reject) => {
    Hospital.find({})
      .or({ name: regex })
      .exec((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
  });
}

function searchDoctors(regex) {
  return new Promise((resolve, reject) => {
    Doctor.find({})
      .or({ name: regex })
      .exec((error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
  });
}

module.exports = {
  searchAll,
  searchUsers,
  searchHospitals,
  searchDoctors
};
