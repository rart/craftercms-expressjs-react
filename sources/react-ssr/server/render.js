import React from 'react';
import ReactDOM from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import { Provider } from 'react-redux';
import flushChunks from 'webpack-flush-chunks';
import App from '../src/components/App';
import configureStore from '../src/configureStore';
import axios from 'axios';
import query from '../src/queries/products.graphql';
import { CRAFTER_BASE, GRAPHQL_URL } from '../src/util';

const store = configureStore();

export default ({ clientStats }) => (req, res) => {

  const chunkNames = flushChunkNames();

  const {
    js,
    styles,
    cssHash
  } = flushChunks(clientStats, { chunkNames });

  const { products } = store.getState();

  Promise.all([
    axios.get(`${CRAFTER_BASE}/api/1/config/preview.json`),
    axios.post(GRAPHQL_URL, {
      query,
      variables: {
        offset: products.offset,
        limit: products.limit
      }
    })
  ]).then(([{ data: { preview } }, { data: response }]) => {

    store.dispatch({
      type: 'PRODUCTS_FETCH_COMPLETE',
      payload: response.data
    });

    store.dispatch({
      type: 'SET_AUTHORING',
      payload: preview
    });

    const app = ReactDOM.renderToString(
      <Provider store={store}>
        <App/>
      </Provider>
    );

    res.send(
      `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>React SSR</title>
          <link rel="shortcut icon" href="${CRAFTER_BASE}/studio/static-assets/img/favicon.ico">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          ${styles}
        </head>
        <body>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}
          </script>
          <div id="root">${app}</div>
          ${cssHash}
          ${js}
        </body>
      </html>`
    );

  }).catch((e) => {
    res.send(
      `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <link rel="shortcut icon" href="${CRAFTER_BASE}/studio/static-assets/img/favicon.ico">
          <title>React SSR</title>
        </head>
        <body>
          <h1>Oops</h1>
          <p>Sorry, an error has occurred fetching data from the server.</p>
          <code>
          ${e.stack}
          </code>
        </body>
      </html>`
    );
  });

};
