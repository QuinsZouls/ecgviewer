import { persistStore, persistReducer } from 'redux-persist';
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator,
} from 'redux-persist-seamless-immutable';

import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import Logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const history = createBrowserHistory({
  initialEntries: [{ state: { key: 'home' } }],
});
const transformerConfig = {
  whitelistPerReducer: {
    app: ['SERVER_URL'],
  },
};

const persistConfig = {
  key: 'health-monitor',
  storage, // Defaults to localStorage
  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)],
  whitelist: ['app'],
};

const persistedReducer = persistReducer(persistConfig, reducers(history));

export const store = createStore(
  persistedReducer,
  compose(applyMiddleware(routerMiddleware(history), Logger, thunk))
);

export const persistor = persistStore(store);
