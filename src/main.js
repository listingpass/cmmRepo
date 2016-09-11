import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { initAuth } from './core/auth';
import configureStore from './core/store';
import Root from './views/root';
import './views/styles/styles.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const store = configureStore();
const syncedHistory = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('root');
injectTapEventPlugin();


function render(Root) {
  ReactDOM.render(
    <AppContainer>
      <Root history={syncedHistory} store={store} />
    </AppContainer>,
    rootElement
  );
}

if (module.hot) {
  module.hot.accept('./views/root', () => {
    render(require('./views/root').default);
  });
}

initAuth(store.dispatch)
  .then(() => render(Root))
  .catch(error => console.error(error)); // eslint-disable-line no-console
