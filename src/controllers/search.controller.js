var searchService = require('../services/search.service');

function searchAll(req, res) {
  var query = req.query.q;
  var regex = new RegExp(query, 'i');

  searchService.searchAll(regex).then((data) => {
    return res.status(200).json({
      status: 'ok',
      data: {
        users: data[0],
        hospitals: data[1],
        doctors: data[2]
      }
    });
  });
}

function searchUsers(req, res) {
  var query = req.query.q;
  var regex = new RegExp(query, 'i');

  searchService.searchUsers(regex).then((data) => {
    return res.status(200).json({
      status: 'ok',
      data
    });
  });
}

function searchHospitals(req, res) {
  var query = req.query.q;
  var regex = new RegExp(query, 'i');

  searchService.searchHospitals(regex).then((data) => {
    return res.status(200).json({
      status: 'ok',
      data
    });
  });
}

function searchDoctors(req, res) {
  var query = req.query.q;
  var regex = new RegExp(query, 'i');

  searchService.searchDoctors(regex).then((data) => {
    return res.status(200).json({
      status: 'ok',
      data
    });
  });
}

module.exports = {
  searchAll,
  searchUsers,
  searchHospitals,
  searchDoctors
};
