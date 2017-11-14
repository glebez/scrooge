import mongoose from 'mongoose';
import promisify from 'es6-promisify';
import passport from 'passport';
import jwt from 'jsonwebtoken';

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

// TODO: add mail sending upon registration

// TODO: add password reset functionality

export function loginUser(req, res, next) {
  passport.authenticate('local', (err, user, passwordErr) => {
    if (err || !user || passwordErr) {
      return res.status(401).send(err || passwordErr || 'No user found!');
    }
    const payload = {
      sub: user._id,
    };
    const token = jwt.sign(payload, process.env.SECRET);
    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: user.email,
    });
  })(req, res, next);
}
