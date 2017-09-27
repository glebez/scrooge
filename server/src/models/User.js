import mongoose from 'mongoose';
import validator from 'validator';
import mongoDBErrorHandler from 'mongoose-mongodb-errors';
import passportLocalMongoose from 'passport-local-mongoose';

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Hey, this is not a valid email'],
    reqired: 'Uhm, we can not register you without an email',
  },
  portfolio: {
    type: [{
      items: {
        type: [{
          code: {
            type: String,
            required: true,
          },
          number: {
            type: Number,
            reqired: true,
          },
          purchaseCost: Number,
          purchaseCurrency: String,
        }],
        reqired: 'Uhm, we can not store an empty portfolio',
        unique: true,
      },
      totalPurchaseCost: Number,
      totalPurchaseCurrency: String,
    }],
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongoDBErrorHandler);

export default mongoose.model('User', userSchema);
