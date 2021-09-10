import { model, Schema } from 'mongoose';
 
const wasteShema = new Schema({
  type: {
    type: Schema.Types.ObjectId,
    ref: 'WasteType',
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

wasteShema.virtual('id').get(function() {
  return this._id.toHexString();
});

wasteShema.set('toJSON', {
  virtuals: true
});

export const Waste = model('Waste', wasteShema);
