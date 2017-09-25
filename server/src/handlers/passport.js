import mongoose from 'mongoose';
import passportJWT from 'passport-jwt';

const User = mongoose.model('User');

function createJWTStrategy() {
  const opts = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
  };

  return new passportJWT.Strategy(opts, (jwtPayload, done) => {
    User.findOne({ _id: mongoose.Types.ObjectId(jwtPayload.sub) }, (err, user) => {
      if (err) {
        done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  });
}

export default createJWTStrategy;
