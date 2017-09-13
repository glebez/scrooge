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

export function validateRegister(req, res, next) {
  req.checkBody('email', 'Your email is not an email 😉').isEmail();
  req.sanitizeBody('email').normalizeEmail();
  req.checkBody('password', 'Your password can not ba blank!').notEmpty();
  req.checkBody('confirmPassword', 'Your password confirmation can not ba blank!').notEmpty();
  req.checkBody('confirmPassword', 'Hm, your passwords do not match.').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    res.status(500).send(errors);
  }

  next();
}
