import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import app from './app';

const reducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    app,
  });

export default reducer;
