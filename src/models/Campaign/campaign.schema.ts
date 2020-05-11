import { Schema, model } from 'mongoose';

const campaignSchema = new Schema(
  {
    support_email: { type: String },
    type: { type: String, default: 'campaign' },
    campaign_type: { type: String },
    bussines: { type: Boolean, required: true },
    fixed_funding: { type: Boolean, required: true },
    country: { type: String },
    country_bank: { type: String },
    goal_amount: { type: Number, required: true },
    currency: { type: String },
    billing_statement: { type: String },
    state: { type: String },
    category: { type: Schema.Types.ObjectId },
    user: { type: Schema.Types.ObjectId },
    basics: { type: Schema.Types.ObjectId },
    content: { type: Schema.Types.ObjectId },
    contact: { type: Schema.Types.ObjectId }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export default model('Campaign', campaignSchema);
