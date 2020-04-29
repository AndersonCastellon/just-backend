var Hospital = require('../models/hospital.schema');

/**
 * Get all hospitals
 */
function getHospitals(req, res) {
  var limit = req.query.limit || 0;
  limit = Number(limit);

  var from = req.query.from || 0;
  from = Number(from);

  Hospital.find({})
    .populate('user', 'name email')
    .skip(from)
    .limit(limit)
    .exec((error, hospitals) => {
      // errors
      if (error) {
        return res.status(500).json({
          status: 'error',
          message: 'Server error',
          errors: error
        });
      }

      // empty hospitals
      if (hospitals.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Hospitals not found',
          errros: { message: 'Hospitals not found' }
        });
      }

      // all ok
      Hospital.count({}, (error, count) => {
        return res.status(200).json({
          status: 'ok',
          count: count,
          hospitals: hospitals
        });
      });
    });
}

/**
 * Get hospital
 */
function getHospital(req, res) {
  var id = req.params.id;

  Hospital.findById(id, (error, hospital) => {
    // errors
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Server error',
        errors: error
      });
    }

    if (!hospital) {
      return res.status(404).json({
        status: 'error',
        message: 'Hospital not exist',
        errors: { message: 'Hospital not exist' }
      });
    }

    // all ok
    return res.status(200).json({
      status: 'ok',
      hospital: hospital
    });
  });
}

/**
 * Create hospital
 */
function create(req, res) {
  var body = req.body;

  var hospital = new Hospital({
    name: body.name,
    photo: body.photo,
    user: req.authUser._id
  });

  hospital.save((error, hospital) => {
    // errors
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Create hospital error',
        errors: error
      });
    }

    return res.status(201).json({
      status: 'ok',
      hospital: hospital
    });
  });
}

/**
 * Update hospital
 */
function update(req, res) {
  var id = req.params.id;
  var body = req.body;

  Hospital.findById(id, (error, hospital) => {
    // errors
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Server error',
        errors: error
      });
    }

    // empty hospital
    if (!hospital) {
      return res.status(404).json({
        status: 'error',
        message: 'Hospital not found',
        errors: { message: 'Hospital not found' }
      });
    }

    hospital.name = body.name;

    hospital.save((error, hospital) => {
      // errors
      if (error) {
        return res.status(400).json({
          status: 'error',
          message: 'Incomplete request',
          errors: error
        });
      }

      // all ok
      return res.status(200).json({
        status: 'ok',
        hospital: hospital
      });
    });
  });
}

/**
 * Delete hospital
 */
function remove(req, res) {
  var id = req.params.id;

  Hospital.findByIdAndRemove(id, (error, hospital) => {
    //erros
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Server error',
        errors: error
      });
    }

    // hospital not exist
    if (!hospital) {
      return res.status(404).json({
        status: 'error',
        message: 'Hospital not exist',
        errors: { message: 'Hospital not exist' }
      });
    }

    // all ok
    return res.status(200).json({
      status: 'ok',
      hospital: hospital
    });
  });
}

module.exports = {
  getHospital,
  getHospitals,
  create,
  update,
  remove
};
