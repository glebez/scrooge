import mongoose from 'mongoose';
import promisify from 'es6-promisify';

require('../models/User.js');

const User = mongoose.model('User');

export async function registerUser(req, res, next) {
  const user = new User({ email: req.body.email });
  const register = promisify(User.register, User);
  try {
    await register(user, req.body.password);
  } catch (err) {
    res.status(500).send(err);
  }
  res.send('success!');
  next();
}

export default registerUser;
