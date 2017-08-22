import Express from 'express';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderStatic } from 'glamor/server';
import { rehydrate } from 'glamor';
import scroogeApp from './reducers';
import Scrooge from './Scrooge';

const app = Express();
const port = 4200;

app.use('/static', Express.static('dist/static'));
// This is fired every time the server side receives a request
app.get('*', handleRender);

// We are going to fill these out in the sections to follow
function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(scroogeApp, composeWithDevTools(applyMiddleware(reduxPackMiddleware)));
  const context = {};

  // Render the component to a string
  const { html, css, ids } = renderStatic(() => {
    return renderToString(
      <Provider store={store}>
        <StaticRouter
        location={req.url}
        context={context}
        >
          <Scrooge />
        </StaticRouter>
      </Provider>
    );
  }
);

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // Send the rendered page back to the client
  res.send(renderFullPage(html, css, ids, preloadedState));
}

function renderFullPage(html, css, ids, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
        <title>Scrooge</title>
        <style>${css}</style>
      </head>
      <body>
        <div id="scrooge">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          window.__REHYDRATION_IDS__ = ${JSON.stringify(ids)}
        </script>
        <script src="static/bundle.js"></script>
      </body>
    </html>
    `;
}

app.listen(port);
