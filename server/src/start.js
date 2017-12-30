import mongoose from 'mongoose';

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err =>
  console.log(`Ouch, the DB is not feeling so well: ${err.message}`),
);

require('./models/User.js');

const port = process.env.PORT || 3000;
const server = require('./server.js').default;

server.listen(port);
