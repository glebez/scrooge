import mongoose from 'mongoose';
import promisify from 'es6-promisify';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import send from '../handlers/mail';

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

export function validateEmail(req, res, next) {
  req.checkBody('email', 'Your email is not an email 😉').isEmail();
  req.sanitizeBody('email').normalizeEmail();

  const errors = req.validationErrors();

  if (errors) {
    res.status(500).send(errors);
  }

  next();
}

// TODO: add mail sending upon registration

export async function forgotPassword(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();
    const url = `http://${req.headers.host}/reset/${user.resetPasswordToken}`;
    await send({
      user,
      subject: 'Password Reset',
      url,
    });
  }

  return res.send();
}

export async function resetPassword(req, res, next) {
  const user = await User.findOne({
    resetPasswordToken: req.params.resetToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(401).send('Password reset is invalid or has expired');
  }

  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  req.body.email = user.email;
  return next();
}

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
