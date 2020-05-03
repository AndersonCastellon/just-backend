var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

// Roles permitidos
var roles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} not an allowed role'
};

// Schema de users, campos, requerimientos y validaciones de los campos en la db

var userSchema = new Schema({
  name: { type: String, required: [true, 'name required'] },
  email: { type: String, unique: true, required: [true, 'email required'] },
  password: { type: String, required: [true, 'password required'] },
  photo: { type: String },
  role: { type: String, required: true, default: 'USER_ROLE', enum: roles },
  google: { type: Boolean, default: false }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

// Exportar el Schema para que pueda ser utilizado por express
module.exports = mongoose.model('User', userSchema);
