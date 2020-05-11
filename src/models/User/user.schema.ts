import { Schema, model, Document } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

import bcript from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  photo?: string;
  active: boolean;
  last_login?: Date;
  role: string;
  type?: string;
  google?: boolean;
  profile?: string;
  bank_information?: string;
  created_at?: Date;
  updated_at?: Date;
  encriptPassword(password: string): Promise<string>;
  verifyPassword(password: string): Promise<boolean>;
}

// Alloweds roles
const roles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} is not an allowed role'
};

// Alloweds categories
const categories = {
  values: ['natural', 'legal'],
  message: '{VALUE} is not allowed category'
};

// Schema de users, campos, requerimientos y validaciones de los campos en la db

const userSchema = new Schema(
  {
    name: { type: String, required: [true, 'name required'] },
    email: { type: String, unique: true, required: [true, 'email required'] },
    password: { type: String, required: [true, 'password required'] },
    photo: { type: String },
    active: { type: Boolean, default: true },
    last_login: { type: Date, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: roles },
    type: { type: String, default: 'user' },
    category: { type: String, default: 'natural', enum: categories },
    google: { type: Boolean, default: false },
    profile: { type: Schema.Types.ObjectId, ref: 'Profile', required: false },
    bank_information: {
      type: Schema.Types.ObjectId,
      ref: 'Bank',
      required: false
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

userSchema.methods.encriptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcript.genSalt(10);
  return await bcript.hash(password, salt);
};

userSchema.methods.verifyPassword = async function (
  password: string
): Promise<boolean> {
  return await bcript.compare(password, this.password);
};

// Exportar el Schema para que pueda ser utilizado por express
export default model<IUser>('User', userSchema);
