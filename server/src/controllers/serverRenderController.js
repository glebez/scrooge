import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { renderStatic } from 'glamor/server';
import scroogeApp from '../../../client/src/reducers';
import Scrooge from '../../../client/src/Scrooge';

function handleRender(req, res) {
  const store = createStore(scroogeApp, composeWithDevTools(applyMiddleware(reduxPackMiddleware)));

  const { html, css, ids } = renderStatic(() =>
    renderToString(
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={{}}
        >
          <Scrooge />
        </StaticRouter>
      </Provider>,
    ),
  );

  const preloadedState = store.getState();

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
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
}

export default handleRender;
