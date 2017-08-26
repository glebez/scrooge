import Express from 'express';
import favicon from 'serve-favicon';
import handleRender from './controllers/serverRenderController';

require('dotenv').config({ path: 'variables.env' });

const app = Express();
const port = process.env.PORT || 3000;

app.use('/static', Express.static('./client/dist'));
app.use(favicon('./client/dist/favicon.ico'));

app.get('*', handleRender);

app.listen(port);
