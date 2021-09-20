import { model, Schema } from 'mongoose';
 
const userShema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  isAdming: {
    type: Boolean,
    default: false
  },
  wastes: {
    type: [Schema.Types.ObjectId],
    ref: 'Waste',
    required: true,
    default: []
  },
  replenishments: {
    type: [Schema.Types.ObjectId],
    ref: 'Replenishment',
    required: true,
    default: []
  },
  wallet: {
    type: [Schema.Types.ObjectId],
    ref: 'Wallet',
    required: true,
    default: []
  }
});

userShema.virtual('id').get(function() {
  return this._id.toHexString();
});

userShema.set('toJSON', {
  virtuals: true
});

export const User = model('User', userShema);
