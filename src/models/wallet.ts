import { model, Schema } from 'mongoose';
 
const walletShema = new Schema({
  currency: {
    type: Schema.Types.ObjectId,
    ref: 'Currency',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  }
});

walletShema.virtual('id').get(function() {
  return this._id.toHexString();
});

walletShema.set('toJSON', {
  virtuals: true
});

export const Wallet = model('Wallet', walletShema);
