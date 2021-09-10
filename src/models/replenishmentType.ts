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

replenishmentTypeShema.virtual('id').get(function() {
  return this._id.toHexString();
});

replenishmentTypeShema.set('toJSON', {
  virtuals: true
});

export const ReplenishmentType = model('ReplenishmentType', replenishmentTypeShema);
