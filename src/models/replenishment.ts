import { model, Schema } from 'mongoose';
 
const replenishmentShema = new Schema({
  type: {
    type: Schema.Types.ObjectId,
    ref: 'ReplenishmentType',
    required: true
  },
	comment: String,
  amount: {
    type: Number,
    required: true
  },
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

replenishmentShema.virtual('id').get(function() {
  return this._id.toHexString();
});

replenishmentShema.set('toJSON', {
  virtuals: true
});

export const Replenishment = model('Replenishment', replenishmentShema);
