var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hospitalSchema = new Schema({
  name: { type: String, required: [true, 'name required'] },
  photo: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Hospital', hospitalSchema);
