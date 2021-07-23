import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store, history } from './redux/store';
import Router from './components/router';

import './styles/index.scss';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
