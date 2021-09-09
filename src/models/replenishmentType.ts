import { model, Schema } from 'mongoose';
 
const replenishmentTypeShema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

export const ReplenishmentType = model('ReplenishmentType', replenishmentTypeShema);
