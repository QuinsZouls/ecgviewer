import immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  appServer: ['server'],
  appError: ['error'],
  appClean: [],
});
const INITIAL_STATE = immutable({
  SERVER_URL: process.env.REACT_APP_DEFAULT_SERVER,
  error: false,
  errorMessage: null,
});

function setServer(state, action) {
  let { server } = action;
  return state.merge({
    error: false,
    errorMessage: null,
    SERVER_URL: server
  });
}
function failure(state, action) {
  let { error } = action;
  return state.merge({
    loading: false,
    error: true,
    errorMessage: error,
  });
}
function clear(state, action) {
  return INITIAL_STATE;
}

const HANDLERS = {
  [Types.APP_SERVER]: setServer,
  [Types.APP_ERROR]: failure,
  [Types.APP_CLEAN]: clear,
};

export const App = Creators;
export const appTypes = Types;
export default createReducer(INITIAL_STATE, HANDLERS);
