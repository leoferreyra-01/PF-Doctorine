import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../redux/reducer';
import thunk from 'redux-thunk';

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
