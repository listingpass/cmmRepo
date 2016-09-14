import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { getRoutes } from './routes';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'


export default function Root({history, store}) {
  return (
    <Provider store={store}>
      <Router history={history} routes={getRoutes(store.getState)} />
    </Provider>
  );
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};
