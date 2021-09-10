import { model, Schema } from 'mongoose';
 
const wasteTypeShema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

wasteTypeShema.virtual('id').get(function() {
  return this._id.toHexString();
});

wasteTypeShema.set('toJSON', {
  virtuals: true
});

export const WasteType = model('WasteType', wasteTypeShema);
