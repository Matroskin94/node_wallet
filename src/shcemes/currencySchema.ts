import { model, Schema } from 'mongoose';
 
const currencyShema = new Schema({
  name: String,
  code: String
});

export const Currency = model('Currency', currencyShema);
