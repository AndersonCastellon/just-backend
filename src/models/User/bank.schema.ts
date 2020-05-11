import { Schema, model } from 'mongoose';

const bankSchema = new Schema({
  routing_number: { type: String },
  account_number: { type: String }
});

export default model('Bank', bankSchema);
