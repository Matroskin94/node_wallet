import { model, Schema } from 'mongoose';
 
const currencyShema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

currencyShema.virtual('id').get(function() {
  return this._id.toHexString();
});

currencyShema.set('toJSON', {
  virtuals: true
});

export const Currency = model('Currency', currencyShema);
