import Express from 'express';
import favicon from 'serve-favicon';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import handleRender from './controllers/serverRenderController';
import { registerUser } from './controllers/userController';

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err =>
  console.log(`Ouch, the DB is not feeling so well: ${err.message}`),
);

require('./models/User.js');

const app = Express();
const port = process.env.PORT || 3000;

app.use('/static', Express.static('./client/dist'));
app.use(favicon('./client/dist/favicon.ico'));
app.use(bodyParser.json());
app.use(passport.initialize());

app.post('/auth/register', registerUser);

app.get('*', handleRender);

app.use((err, req, res) => {
  res.status(500).send(err);
});

app.listen(port);
