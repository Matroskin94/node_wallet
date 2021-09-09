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

export const WasteType = model('WasteType', wasteTypeShema);
