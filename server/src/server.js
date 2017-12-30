import Express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import expressValidator from 'express-validator';
import createJWTStrategy from './handlers/passport';
import routes from './routes';

function forceSsl(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
}

const User = mongoose.model('User');
passport.use(User.createStrategy());
passport.use(createJWTStrategy());

const app = Express();

if (process.env.NODE_ENV === 'production') {
  app.use(forceSsl);
}

app.use('/static', Express.static('./client/dist'));
app.use(favicon('./client/dist/favicon.ico'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(expressValidator());

app.use('/', routes);

app.use((err, req, res) => {
  res.status(500).send(err);
});

export default app;
