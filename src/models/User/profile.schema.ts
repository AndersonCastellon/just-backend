import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
  country: { type: String },
  city: { type: String },
  postal_code: { type: String },
  story: { type: String },
  about: { type: String },
  profile_image: { type: String },
  facebook_link: { type: String },
  twitter_link: { type: String },
  youtube_link: { type: String },
  linkedin_link: { type: String },
  website_link: { type: String }
});

export default model('Profile', profileSchema);
