import { model, Schema } from 'mongoose';
 
const replenishmentShema = new Schema({
  type: {
    type: Schema.Types.ObjectId,
    ref: 'ReplenishmentType',
    required: true
  },
	comment: String,
	currency: {
    type: Schema.Types.ObjectId,
    ref: 'Currency',
    required: true
  },
	date: {
    type: Date,
    default: Date.now
  }
});

export const Replenishment = model('Replenishment', replenishmentShema);
