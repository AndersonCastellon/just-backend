var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doctorSchema = new Schema({
  name: { type: String, required: [true, 'name required'] },
  photo: { type: String, required: false },
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: [true, 'Hospital required']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User required']
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
