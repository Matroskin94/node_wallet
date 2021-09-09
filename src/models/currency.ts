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

export const Currency = model('Currency', currencyShema);
