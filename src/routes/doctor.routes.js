var express = require('express');
var app = express();

var mdAuth = require('../middleware/auth.middleware');
var Doctor = require('../models/doctor.schema');

/**
 * Get all doctors
 */
app.get('/', (req, res) => {
  Doctor.find({}, (error, doctors) => {
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
    return res.status(200).json({
      status: 'ok',
      doctors: doctors
    });
  });
});

/**
 * Create doctor
 */
app.post('/', mdAuth.verifyToken, (req, res) => {
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
});

/**
 * Update doctor
 */
app.put('/:id', mdAuth.verifyToken, (req, res) => {
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
});

/**
 * Delete doctor
 */
app.delete('/:id', mdAuth.verifyToken, (req, res) => {
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
});

module.exports = app;
