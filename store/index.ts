import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer } from './reducer';
import { initState } from './state';
import { InitStateInterface } from './interfaces';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const configureStore = (initialState = initState) =>
  createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export const store = configureStore();

export const createAppStore = (state: InitStateInterface): typeof store => {
  return configureStore({ ...initState, ...state });
};

export const createTestStore = (state: InitStateInterface): typeof store => {
  // было так зачем то
  ///return configureStore({ ...state, initState });
  return configureStore({ ...state, ...initState });
};

export { InitStateInterface } from './interfaces';
export * from './actions';
