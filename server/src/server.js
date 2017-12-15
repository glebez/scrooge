import Express from 'express';
import favicon from 'serve-favicon';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import expressValidator from 'express-validator';
import routes from './routes';
import createJWTStrategy from './handlers/passport';

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err =>
  console.log(`Ouch, the DB is not feeling so well: ${err.message}`),
);

require('./models/User.js');

const User = mongoose.model('User');
passport.use(User.createStrategy());
passport.use(createJWTStrategy());

const app = Express();
const port = process.env.PORT || 3000;

app.use('/static', Express.static('./client/dist'));
app.use(favicon('./client/dist/favicon.ico'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(expressValidator());

app.use('/', routes);

app.use((err, req, res) => {
  res.status(500).send(err);
});

app.listen(port);
