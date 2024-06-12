import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import session from './session';
import errors from './errors';
import modal from './modal'
import decks from './decks';


const rootReducer = combineReducers({
  session,
  errors,
  modal,
  decks
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// const configureStore = (preloadedState) => {
//   return createStore(rootReducer, preloadedState, enhancer);
// };

const configureStore = (preloadedState) => {
  const store = createStore(rootReducer, preloadedState, enhancer);

  if (import.meta.env.MODE !== "production") {
    window.store = store; // Expose the store to the window object
  }

  return store;
};

export default configureStore;