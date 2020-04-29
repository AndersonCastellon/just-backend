var Doctor = require('../models/doctor.schema');

/**
 * Get doctors
 */
function getDoctors(req, res) {
  var limit = req.query.limit || 0;
  limit = Number(limit);

  var from = req.query.from || 0;
  from = Number(from);

  Doctor.find({})
    .populate('user', 'name email')
    .populate('hospital')
    .skip(from)
    .limit(limit)
    .exec((error, doctors) => {
      // errors
      if (error) {
        return res.status(500).json({
          status: 'error',
          message: 'Server error',
          errors: error
        });
      }

      // empty doctors
      if (doctors.length === 0) {
        return res.status(404).json({
          status: 'error',
          message: 'Doctors not exist',
          errors: { message: 'Doctors not exist' }
        });
      }

      // all ok
      Doctor.count({}, (error, count) => {
        return res.status(200).json({
          status: 'ok',
          count: count,
          doctors: doctors
        });
      });
    });
}

/**
 * Get doctor
 */
function getDoctor(req, res) {
  var id = req.params.id;

  Doctor.findById(id, (error, doctor) => {
    // errors
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Server error',
        errors: error
      });
    }

    if (!doctor) {
      return res.status(404).json({
        status: 'error',
        message: 'Doctor not exist',
        errors: { message: 'Doctor not exist' }
      });
    }

    // all ok
    return res.status(200).json({
      status: 'ok',
      doctor: doctor
    });
  });
}

/**
 * Create doctor
 */
function create(req, res) {
  var body = req.body;

  var doctor = new Doctor({
    name: body.name,
    photo: body.photo,
    hospital: body.hospital,
    user: req.authUser._id
  });

  doctor.save((error, doctor) => {
    // errors
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Server error',
        errors: error
      });
    }

    // empty doctor
    if (!doctor) {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete request',
        errors: { message: 'Incomplete request' }
      });
    }

    // all ok
    return res.status(201).json({
      status: 'ok',
      doctor: doctor
    });
  });
}

/**
 * Update doctor
 */
function update(req, res) {
  var id = req.params.id;
  var body = req.body;

  Doctor.findById(id, (error, doctor) => {
    // errors
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Server error',
        errors: error
      });
    }

    // empty doctor
    if (!doctor) {
      return res.status(404).json({
        status: 'error',
        message: 'Doctor not exist',
        errors: { message: 'Doctor not exist' }
      });
    }

    // all ok
    doctor.name = body.name;
    doctor.photo = body.photo;
    doctor.hospital = doby.hospital;

    doctor.save((error, doctor) => {
      //errors
      if (error) {
        return res.status(500).json({
          status: 'error',
          message: 'Server error',
          errors: error
        });
      }

      // all ok

      return res.status(200).json({
        status: 'ok',
        doctor: doctor
      });
    });
  });
}

/**
 * Delete doctor
 */
function remove(req, res) {
  var id = req.params.id;

  Doctor.findByIdAndRemove(id, (error, doctor) => {
    //errors
    if (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Server error',
        errors: error
      });
    }

    // empty doctor
    if (!doctor) {
      return res.status(404).json({
        status: 'error',
        message: 'Doctor not exist',
        errors: { message: 'Doctor not exist' }
      });
    }

    // all ok
    return res.status(200).json({
      status: 'ok',
      doctor: doctor
    });
  });
}

module.exports = {
  getDoctors,
  getDoctor,
  create,
  update,
  remove
};
