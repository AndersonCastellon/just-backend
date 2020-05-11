import { Schema, model } from 'mongoose';

const basicSchema = new Schema({
  title: { type: String },
  description: { type: String },
  tagline: { type: String },
  card_image: { type: String },
  tags: [{ tag: String }],
  duration: { type: Number }
});

export default model('Basic', basicSchema);
