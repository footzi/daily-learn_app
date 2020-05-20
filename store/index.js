import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer } from './reducer';
import { initState } from './state';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const configureStore = (initialState = initState) =>
  createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export const store = configureStore();

export const createAppStore = (state = {}) => {
  return configureStore({ ...initState, ...state });
};

export const createTestStore = (state = {}) => {
  return configureStore({ ...state, initState });
};

export { actions } from './actions';
